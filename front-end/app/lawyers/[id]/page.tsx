'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'
import { getPublicLawyerById, getPublicLawyerReviews } from '@/lib/services/lawyers'
import { PublicLawyer, PublicReview } from '@/lib/types/lawyers'
import { FaArrowLeft } from 'react-icons/fa'
import { useAuthStore } from '@/store/auth-store'
import { Button } from '@/components/ui/button'

// Import components
import LawyerHeader from '@/components/lawyers/LawyerHeader'
import LawyerBasicInfo from '@/components/lawyers/LawyerBasicInfo'
import LawyerReviews from '@/components/lawyers/LawyerReviews'

export default function LawyerDetailPage({ params }: { params: { id: string } }) {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lawyer, setLawyer] = useState<PublicLawyer | null>(null)
  const [reviews, setReviews] = useState<PublicReview[]>([])

  useEffect(() => {
    const fetchLawyerData = async () => {
      setLoading(true)
      try {
        // Fetch lawyer details
        const lawyerId = parseInt(params.id)
        const lawyerData = await getPublicLawyerById(lawyerId)
        setLawyer(lawyerData.data)
        
        // Fetch lawyer reviews
        const reviewsData = await getPublicLawyerReviews(lawyerId)
        setReviews(reviewsData.data)
        
        setError(null)
      } catch (err) {
        console.error('Error fetching lawyer data:', err)
        setError('Failed to load lawyer details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchLawyerData()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto flex justify-center px-4 py-16">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  if (error || !lawyer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/lawyers"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <div className="mr-2">
              <FaArrowLeft size={16} />
            </div>
            {t('lawyers.backToLawyers')}
          </Link>
        </div>
        <div className="rounded-lg bg-red-50 p-6 text-center text-red-700">
          <p>{error || t('lawyers.lawyerNotFound')}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="danger"
            className="mt-4"
          >
            {t('lawyers.tryAgain')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/lawyers"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <div className="mr-2">
            <FaArrowLeft size={16} />
          </div>
          {t('lawyers.backToLawyers')}
        </Link>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <LawyerHeader 
          lawyer={lawyer} 
          bookingLink={
            isAuthenticated 
              ? `/appointments/book?lawyer=${lawyer.id}`
              : `/auth/login?from=/appointments/book?lawyer=${lawyer.id}`
          }
          isAuthenticated={isAuthenticated}
        />

        <Tabs defaultValue="basicInformation" className="w-full">
          <TabsList className="mb-4 border-b border-gray-200">
            <TabsTrigger value="basicInformation">{t('lawyers.tabs.basicInformation')}</TabsTrigger>
            <TabsTrigger value="reviews">{t('lawyers.tabs.reviews')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basicInformation">
            <LawyerBasicInfo
              lawyer={lawyer}
               bookingLink={
                 isAuthenticated
                   ? `/appointments/book?lawyer=${lawyer.id}`
                   : `/auth/login?from=/appointments/book?lawyer=${lawyer.id}`
               }
               isAuthenticated={isAuthenticated}
            />
          </TabsContent>
          
          <TabsContent value="reviews">
            <LawyerReviews 
              lawyer={lawyer} 
              reviews={reviews} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 