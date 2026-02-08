"use client";

import {useEffect, useState, useCallback} from "react";
import {useTranslation} from "react-i18next";
import Link from "next/link";
import {Loader2, Search} from "lucide-react";
import { Question, QuestionSearchParams } from "@/lib/types/questions";
import { Button } from "@/components/ui/button";
import {getQuestions} from "@/lib/services";
import {getFullName, PaginationMeta} from "@/lib/types";
import Pagination from "@/components/common/Pagination";
import {useAuthStore} from "@/store/auth-store";

export default function QuestionsPage() {
  const {t} = useTranslation();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState<QuestionSearchParams>({
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    page_size: 10,
    total_items: 0,
    total_pages: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const {user, isAuthenticated} = useAuthStore();
  const isLawyer = user?.role === 'lawyer';

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update search params when debounced search term changes
  useEffect(() => {
    setSearchParams(prev => ({
      ...prev,
      page: 1
    }));
  }, [debouncedSearchTerm]);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const params: QuestionSearchParams = {
        ...searchParams,
        title: debouncedSearchTerm,
        is_public: "true",
      };

      const response = await getQuestions(params);
      setQuestions(response.data || []);
      setPagination(
        response.pagination || {
          page: 1,
          page_size: 2,
          total_items: 0,
          total_pages: 0,
        }
      );
    } catch (err) {
      console.error("Error fetching questions:", err);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, [searchParams, debouncedSearchTerm, t]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => ({...prev, page: newPage}));
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  return (
    <div className="w-full">
      {/* Banner Header Section */}
      <div 
        className="w-full py-20 md:py-28 relative shadow-lg text-white"
        style={{
          backgroundImage: 'url(/images/banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maxHeight: '330px',
        }}
      >
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-3 justify-center">
            {t("questions.title")}
          </h1>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400">
                <Search size={18}/>
              </div>
              <input
                type="text"
                placeholder={t("questions.searchPlaceholder")}
                className="w-full rounded-lg border-0 py-4 pl-10 pr-10 shadow-md focus:ring-2 focus:ring-indigo-500 text-gray-800 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Questions Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            {pagination.total_items > 0
              ? t("questions.foundResults", {count: pagination.total_items})
              : ''}
          </p>
          
          {isAuthenticated && !isLawyer && (
            <Link href="/questions/ask">
              <Button variant="primary">
                {t("questions.newQuestion")}
              </Button>
            </Link>
          )}
        </div>

        <div className="space-y-4">
          {questions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {t("questions.empty")}
            </div>
          ) : (
            questions.map((question) => (
              <a
                href={`/questions/${question.id}`}
                key={question.id}
                className="group block rounded-lg bg-white p-6 shadow cursor-pointer transition-shadow hover:shadow-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4 mb-3">
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      {question.answer_count} {t("questions.answers")}
                    </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      question.status === "open"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                      {t(`questions.status.${question.status}`)}
                    </span>
                </div>
                <div className="mb-2 flex items-center justify-between w-full">
                  <h2 className="text-xl font-semibold w-full break-words">
                    <Link
                      href={`/questions/${question.id}`}
                      className="hover:text-blue-600 block break-words"
                    >
                      {question.title}
                    </Link>
                  </h2>
                </div>
                <p className="mb-4 text-gray-600 line-clamp-2">
                  {question.content}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <span>
                      {question.is_anonymous
                        ? t("questions.anonymous")
                        : getFullName(question.user)}
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      {new Date(question.created_at).toLocaleDateString()}
                    </span>
                  </div>

                </div>
              </a>
            ))
          )}
        </div>

        {!loading && questions.length > 0 && pagination.total_pages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={pagination.page}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}