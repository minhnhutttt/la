'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Loader2, Edit, Check, X, Save } from 'lucide-react';
import { getQuestionById, getQuestionAnswers, createAnswer, updateQuestion, updateAnswer } from '@/lib/services';
import { getMyLawyerProfile } from '@/lib/services/lawyers';
import {Question, Answer, AnswerCreateRequest, QuestionCreateRequest} from '@/lib/types/questions';
import { useAuthStore } from '@/store/auth-store';
import {getFullName} from "@/lib/types";
import UserAvatarIcon from '@/components/UserAvatarIcon';
import { Button } from '@/components/ui/button';
import {formatToYYYYMMDD} from "@/lib/utils";

export default function QuestionDetailPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation();
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuthStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  }));
  // States for lawyer verification
  const [isLawyer, setIsLawyer] = useState(false);
  const [isVerifiedLawyer, setIsVerifiedLawyer] = useState(false);
  const [lawyerVerificationLoading, setLawyerVerificationLoading] = useState(false);
  const isClient = isAuthenticated && user?.role !== 'lawyer';
  const isOwner = isClient && question?.user?.id === user?.id;

  // States for editing mode
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const [newAnswerContent, setNewAnswerContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Edit answer states
  const [editingAnswerId, setEditingAnswerId] = useState<number | null>(null);
  const [editAnswerContent, setEditAnswerContent] = useState('');
  const [isUpdatingAnswer, setIsUpdatingAnswer] = useState(false);
  const [updateAnswerError, setUpdateAnswerError] = useState<string | null>(null);

  // Initialize edit form when question data is loaded
  useEffect(() => {
    if (question) {
      setEditTitle(question.title);
      setEditContent(question.content);
    }
  }, [question]);

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      const questionIdStr = params.id;
      if (!questionIdStr || isNaN(Number(questionIdStr))) {
        setError(t('answers.invalidId'));
        setLoading(false);
        return;
      }
      const questionId = parseInt(questionIdStr, 10);

      setLoading(true);
      setError(null);
      setQuestion(null);
      setAnswers([]);

      try {
        const [questionResponse, answersResponse] = await Promise.all([
          getQuestionById(questionId),
          getQuestionAnswers(questionId)
        ]);

        if (questionResponse && questionResponse.data) {
          setQuestion(questionResponse.data);
        } else {
          console.warn(`No question data found for ID: ${questionId}`);
        }

        if (answersResponse && answersResponse.data) {
          setAnswers(answersResponse.data);
        } else {
           console.log(`No answers found for question ID: ${questionId}, which might be normal.`);
           setAnswers([]);
        }

        if (!questionResponse?.data) {
             setError(t('answers.notFound'));
        }

      } catch (err: any) {
        console.error('Error fetching question details or answers:', err);
        setError(t('answers.errorLoading') + (err.message ? `: ${err.message}` : ''));
        setQuestion(null);
        setAnswers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionAndAnswers();
  }, [params.id, t]);

  useEffect(() => {
    const checkLawyerVerification = async () => {
      if (isAuthenticated && user?.role === 'lawyer') {
        setIsLawyer(true);
        setLawyerVerificationLoading(true);
        
        try {
          const response = await getMyLawyerProfile();
          if (response && response.data) {
            setIsVerifiedLawyer(response.data.is_verified);
          }
        } catch (error) {
          console.error('Error checking lawyer verification status:', error);
        } finally {
          setLawyerVerificationLoading(false);
        }
      } else {
        setIsLawyer(false);
        setIsVerifiedLawyer(false);
      }
    };
    
    checkLawyerVerification();
  }, [isAuthenticated, user]);

  const handleEnterEditMode = () => {
    setIsEditMode(true);
    setEditTitle(question?.title || '');
    setEditContent(question?.content || '');
    setEditError(null);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditError(null);
  };

  const handleSubmitEdit = async () => {

    if (!isOwner || !question || isEditing) {
      return;
    }

    // Validate title
    if (!editTitle.trim()) {
      setEditError(t('questions.titleRequired'));
      return;
    } else if (editTitle.trim().length < 15) {
      setEditError(t('questions.titleMinLength', { length: 15 }));
      return;
    }

    // Validate content
    if (!editContent.trim()) {
      setEditError(t('questions.contentRequired'));
      return;
    } else if (editContent.trim().length < 30) {
      setEditError(t('questions.contentMinLength', { length: 30 }));
      return;
    }

    setIsEditing(true);
    setEditError(null);

    const questionId = question.id;
    const updateData: Partial<QuestionCreateRequest> = {
      title: editTitle.trim(),
      content: editContent.trim(),
    };

    try {
      const response = await updateQuestion(questionId, updateData);
      const updatedQuestion = response.data;
      
      // Ensure user information is preserved when updating the question
      setQuestion({
        ...updatedQuestion,
        user: question.user // Preserve the original user information
      });
      setIsEditMode(false);
    } catch (err: any) {
      console.error('Error updating question:', err);
      const message = err.response?.data?.message || err.message || t('questions.updateError');
      setEditError(message);
    } finally {
      setIsEditing(false);
    }
  };

  const handleEditAnswer = (answer: Answer) => {
    setEditingAnswerId(answer.id);
    setEditAnswerContent(answer.content);
    setUpdateAnswerError(null);
  };

  const handleCancelEditAnswer = () => {
    setEditingAnswerId(null);
    setEditAnswerContent('');
    setUpdateAnswerError(null);
  };

  const handleUpdateAnswer = async () => {

    if (!editingAnswerId || !editAnswerContent.trim() || isUpdatingAnswer) {
      return;
    }

    setIsUpdatingAnswer(true);
    setUpdateAnswerError(null);

    try {
      const response = await updateAnswer(editingAnswerId, editAnswerContent.trim());
      const updatedAnswer = response.data;
      
      // Find the original answer to preserve its lawyer information if needed
      const originalAnswer = answers.find(answer => answer.id === editingAnswerId);
      
      // Ensure the updated answer maintains the lawyer user_id connection
      if (updatedAnswer && originalAnswer) {
        // Make sure the lawyer property with user_id is preserved
        if (!updatedAnswer.lawyer || !updatedAnswer.lawyer.user_id) {
          updatedAnswer.lawyer = {
            ...updatedAnswer.lawyer,
            ...originalAnswer.lawyer
          };
        }
      }
      
      // Update the answer in the list
      setAnswers(prevAnswers => 
        prevAnswers.map(answer => 
          answer.id === editingAnswerId ? updatedAnswer : answer
        )
      );
      
      // Exit edit mode
      setEditingAnswerId(null);
      setEditAnswerContent('');
    } catch (err: any) {
      console.error('Error updating answer:', err);
      const message = err.response?.data?.message || err.message || t('answers.updateError');
      setUpdateAnswerError(message);
    } finally {
      setIsUpdatingAnswer(false);
    }
  };

  const handleSubmitAnswer = async () => {

    if (!isLawyer || !newAnswerContent.trim() || isSubmitting || !question) {
      return;
    }

    const questionId = question.id;

    setIsSubmitting(true);
    setSubmitError(null);

    const answerData: AnswerCreateRequest = {
      content: newAnswerContent.trim(),
      question_id: questionId,
    };

    try {
      const response = await createAnswer(answerData);

      // Get the new answer from the response and ensure it has the lawyer data needed for edit functionality
      const newAnswer = response.data;
      
      // Make sure the newAnswer has the required lawyer information including user_id
      // If the API doesn't return complete lawyer info, we'll add it based on current user
      if (newAnswer && (!newAnswer.lawyer || !newAnswer.lawyer.user_id)) {
        // Create a properly typed lawyer object with existing data or defaults
        newAnswer.lawyer = {
          ...newAnswer.lawyer,
          user_id: user?.id || 0,
          // Construct the full_name from user's first and last name
          full_name: (user?.first_name && user?.last_name) ? 
                    `${user.first_name} ${user.last_name}` : t('answers.unknownUser'),
          profile_image: user?.profile_image || ''
        };
      }

      setAnswers((prevAnswers) => [newAnswer, ...prevAnswers]);
      setNewAnswerContent('');
    } catch (err: any) {

      const message = err.response?.data?.message || err.message || t('answers.answerSubmitError');
      setSubmitError(message);

    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

   if (error) {
     return <div className="text-center py-12 text-red-500">{error}</div>;
   }

  if (!question) {
    return <div className="text-center py-12 text-gray-500">{t('answers.notFound')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/questions"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
           <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {t('answers.backLink')}
        </Link>
      </div>

      <div>
        {!isEditMode ? (
          <>
            <div className="mb-2 flex items-start justify-between">
              <h1 className="text-2xl font-bold mr-4">{question.title}</h1>
              <div className="flex items-center">
                {isOwner && (
                  <Button
                    variant="ghost"
                    className="mr-2 p-1 text-gray-500 hover:text-blue-600"
                    onClick={handleEnterEditMode}
                    aria-label="Edit question"
                    size="sm"
                  >
                    <Edit className="h-5 w-5" />
                  </Button>
                )}
                <span
                  className={`flex-shrink-0 rounded-full px-3 py-1 text-xs ${
                    question.status === "open"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {t(`questions.status.${question.status}`)}
                </span>
              </div>
            </div>

            <div className="mb-4 flex items-center text-sm text-gray-500">
              <span className="mr-4">
                {t('answers.postedBy')}{' '}
                {question.is_anonymous ? t('answers.anonymous') : getFullName(question.user) || t('answers.unknownUser')}
              </span>
              <span>{formatToYYYYMMDD(question.created_at)}</span>
            </div>

            <div className="mt-12 mb-12 border-b border-gray-200 pb-6">
              <p className="text-gray-800 whitespace-pre-wrap text-lg leading-[1.3] break-words overflow-wrap-anywhere">
                {question.content}
              </p>
            </div>
          </>
        ) : (
          <div className="mb-6 border-b border-gray-200 pb-6">
            <h2 className="mb-4 text-xl font-semibold">{t('questions.editQuestion')}</h2>
            
            <div className="mb-4">
              <label className="block mb-1 font-medium">{t('questions.title')}</label>
              <input
                type="text"
                className={`w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none ${editError ? 'border-red-500' : 'border-gray-300'}`}
                value={editTitle}
                onChange={(e) => {
                  setEditTitle(e.target.value);
                  if (editError) setEditError(null);
                }}
                disabled={isEditing}
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-1 font-medium">{t('questions.content')}</label>
              <textarea
                className={`w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none ${editError ? 'border-red-500' : 'border-gray-300'}`}
                rows={5}
                value={editContent}
                onChange={(e) => {
                  setEditContent(e.target.value);
                  if (editError) setEditError(null);
                }}
                disabled={isEditing}
              ></textarea>
            </div>
            
            {editError && (
              <p className="mb-4 text-sm text-red-600">{editError}</p>
            )}
            
            <div className="flex items-center space-x-2">
              <Button
                variant="primary"
                onClick={handleSubmitEdit}
                disabled={isEditing}
                isLoading={isEditing}
                className="px-4 py-2"
              >
                {!isEditing && <Check className="mr-2 h-4 w-4" />}
                {t('questions.saveChanges')}
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleCancelEdit}
                disabled={isEditing}
                className="px-4 py-2"
              >
                <X className="mr-2 h-4 w-4" />
                {t('questions.cancel')}
              </Button>
            </div>
          </div>
        )}

        <div className="mb-8">
           <h2 className="mb-4 text-xl font-semibold">
            {answers.length === 1 ? t('answers.answerSingular') : t('answers.answerPlural', {number: answers.length})}
          </h2>
          
          {!isAuthenticated ? (
            <div className="text-center py-8 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="text-lg font-medium text-gray-600 mb-2">
                {t('answers.loginRequired')}
              </div>
              <div className="mt-4">
                <Link href="/auth/login" className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                  {t('common.login')}
                </Link>
              </div>
            </div>
          ) : answers.length > 0 ? (
            answers.map((answer) => (
              <div
                key={answer.id}
                className="mb-4 rounded-lg bg-gray-50 p-4"
              >
                {/* Avatar + tên thôi */}
                <div className="mb-2 flex items-center justify-between">
                  <Link href={`/lawyers/${answer.lawyer.id}`} className="flex items-center">
                    {answer.lawyer.profile_image
                      ? <UserAvatarIcon profileImage={answer.lawyer.profile_image} />
                      : (
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          {answer.lawyer.full_name?.substring(0, 2).toUpperCase() || "LA"}
                        </div>
                      )
                    }
                    <div className="ml-3">
                      <p className="font-medium text-gray-900 hover:text-blue-600">
                        {answer.lawyer.full_name || t('answers.unknownUser')} <span className="font-normal text-sm">弁護士</span>
                      </p>
                      {answer.lawyer.office_name && (
                        <p className="text-sm text-gray-500">{answer.lawyer.office_name}</p>
                      )}
                    </div>
                  </Link>
                  
                  {/* Edit button - visible only on mobile and when applicable */}
                  {isLawyer && user?.id === answer.lawyer.user_id && editingAnswerId !== answer.id && (
                    <Button
                      variant="ghost"
                      className="p-1 text-gray-500 hover:text-blue-600 md:hidden"
                      onClick={() => handleEditAnswer(answer)}
                      aria-label="Edit answer"
                      size="sm"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Nội dung hoặc textarea edit */}
                {editingAnswerId === answer.id ? (
                  <div>
                    <textarea
                      className={`mb-2 w-full rounded-md border p-3 focus:border-blue-500 focus:outline-none ${updateAnswerError ? 'border-red-500' : 'border-gray-300'}`}
                      rows={5}
                      value={editAnswerContent}
                      onChange={(e) => {
                        setEditAnswerContent(e.target.value);
                        if (updateAnswerError) setUpdateAnswerError(null);
                      }}
                      disabled={isUpdatingAnswer}
                    />
                    {updateAnswerError && (
                      <p className="mb-3 text-sm text-red-600">{updateAnswerError}</p>
                    )}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="primary"
                        onClick={handleUpdateAnswer}
                        disabled={isUpdatingAnswer || !editAnswerContent.trim()}
                        isLoading={isUpdatingAnswer}
                        className="px-4 py-2"
                      >
                        {!isUpdatingAnswer && <Save className="mr-2 h-4 w-4" />}
                        {t('answers.saveAnswer')}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handleCancelEditAnswer}
                        disabled={isUpdatingAnswer}
                        className="px-4 py-2"
                      >
                        <X className="mr-2 h-4 w-4" />
                        {t('answers.cancel')}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 mb-2 text-gray-800 text-lg leading-[1.3]">
                    {answer.content}
                  </p>
                )}

                {/* Desktop edit button and date info */}
                <div className="mt-2 flex justify-end items-center space-x-2 text-sm text-gray-500">
                  {/* Edit button - visible only on desktop and when applicable */}
                  {isLawyer && user?.id === answer.lawyer.user_id && editingAnswerId !== answer.id && (
                    <Button
                      variant="ghost"
                      className="p-1 text-gray-500 hover:text-blue-600 hidden md:flex"
                      onClick={() => handleEditAnswer(answer)}
                      aria-label="Edit answer"
                      size="sm"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  <span className="hidden md:inline">{formatToYYYYMMDD(answer.created_at)}</span>
                  
                  {/* Mobile date display at bottom-right */}
                  <span className="md:hidden">{formatToYYYYMMDD(answer.created_at)}</span>
                </div>
              </div>
            ))
          ) : (
             <div className="text-center py-6 text-gray-500">
              {t('answers.noAnswersYet')}
            </div>
          )}
        </div>

        {isLawyer && (
            <div>
              <h3 className="mb-4 text-lg font-semibold">{t('answers.yourAnswer', {name: user?.first_name})}</h3>
              
              {lawyerVerificationLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin text-gray-500" /> 
                  <span className="ml-2 text-gray-500">{t('common.loading')}</span>
                </div>
              ) : isVerifiedLawyer ? (
                <>
                  <textarea
                    className={`mb-2 w-full rounded-md border p-3 focus:border-blue-500 focus:outline-none ${submitError ? 'border-red-500' : 'border-gray-300'}`}
                    rows={5}
                    placeholder={t('answers.answerPlaceholder')}
                    value={newAnswerContent}
                    onChange={(e) => {
                      setNewAnswerContent(e.target.value);
                      if (submitError) setSubmitError(null);
                    }}
                    disabled={isSubmitting}
                  ></textarea>
                  {submitError && (
                    <p className="mb-3 text-sm text-red-600">{submitError}</p>
                  )}
                  <Button
                    variant="primary"
                    onClick={handleSubmitAnswer}
                    disabled={isSubmitting || !newAnswerContent.trim()}
                    isLoading={isSubmitting}
                    className="px-4 py-2"
                  >
                    {t('answers.submitAnswer')}
                  </Button>
                </>
              ) : (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800">
                  <p>{t('answers.verificationRequired') || 'Your lawyer account must be verified before you can answer questions. Please wait for an administrator to verify your account.'}  </p>
                </div>
              )}
            </div>
        )}
      </div>
    </div>
  );
}