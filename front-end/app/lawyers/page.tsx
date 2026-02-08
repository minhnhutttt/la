'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getPublicLawyers } from '@/lib/services'
import { PublicLawyer, PublicLawyerSearchParams } from '@/lib/types'
import { PaginationMeta } from '@/lib/types'
import { LAWYER_SPECIALTIES } from '@/lib/types/enums'
import { Button } from '@/components/ui/button'

// Import components
import SearchBar from '@/components/lawyers/SearchBar'
import LawyerFilters from '@/components/lawyers/LawyerFilters'
import LawyersList from '@/components/lawyers/LawyersList'
import Pagination from '@/components/common/Pagination'

export default function LawyersPage() {
  const { t } = useTranslation()
  const [lawyers, setLawyers] = useState<PublicLawyer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState<PublicLawyerSearchParams>({
    page: 1,
    page_size: 9
  })
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    page_size: 9,
    total_items: 0,
    total_pages: 0
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedPrefecture, setSelectedPrefecture] = useState('')
  const [minRating, setMinRating] = useState<number | null>(null)
  const [minExperience, setMinExperience] = useState<number | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const allSpecialtiesOption = 'all'

  // Fetch lawyers when component mounts or search params change
  useEffect(() => {
    const fetchLawyers = async () => {
      setLoading(true)
      try {
        const params: PublicLawyerSearchParams = { ...searchParams }
        
        // Add filters if they exist
        if (searchTerm) params.name = searchTerm
        if (selectedSpecialty && selectedSpecialty !== 'all') {
          params.specialty = selectedSpecialty
        }
        if (selectedPrefecture) params.prefecture = selectedPrefecture
        if (minRating) params.min_rating = minRating
        if (minExperience) params.experience = minExperience

        const response = await getPublicLawyers(params)
        setLawyers(response.data)
        if (response.pagination) {
          setPagination(response.pagination)
        }
        setError(null)
      } catch (err) {
        console.error('Error fetching lawyers:', err)
        setError('Failed to load lawyers. Please try again.')
        setLawyers([])
      } finally {
        setLoading(false)
      }
    }

    fetchLawyers()
  }, [searchParams, searchTerm, selectedSpecialty, selectedPrefecture, minRating, minExperience, t])

  const handleSearch = () => {
    // Reset to page 1 when searching
    setSearchParams((prev: PublicLawyerSearchParams) => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev: PublicLawyerSearchParams) => ({ ...prev, page: newPage }))
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSpecialtyChange = (specialty: string) => {
    if (specialty === 'all') {
      setSelectedSpecialty('')
    } else {
      setSelectedSpecialty(specialty)
    }
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setSelectedSpecialty('')
    setSelectedPrefecture('')
    setMinRating(null)
    setMinExperience(null)
    setSearchParams({ page: 1, page_size: 6 })
  }

  const handlePrefectureChange = (prefecture: string) => {
    setSelectedPrefecture(prefecture)
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <div className="w-full">
      {/* Search Header */}
      <SearchBar 
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearch={handleSearch}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Desktop filters - always shown */}
          <div className="hidden md:block md:col-span-1">
            <LawyerFilters 
              allSpecialtiesOption={allSpecialtiesOption}
              specialties={LAWYER_SPECIALTIES}
              selectedSpecialty={selectedSpecialty}
              selectedPrefecture={selectedPrefecture}
              minRating={minRating}
              minExperience={minExperience}
              onSpecialtyChange={handleSpecialtyChange}
              onPrefectureChange={handlePrefectureChange}
              onMinRatingChange={setMinRating}
              onMinExperienceChange={setMinExperience}
              onClearFilters={handleClearFilters}
            />
          </div>
          
          {/* Mobile filters - shown when toggled */}
          {isFilterOpen && (
            <div className="md:hidden col-span-1">
              <LawyerFilters 
                allSpecialtiesOption={allSpecialtiesOption}
                specialties={LAWYER_SPECIALTIES}
                selectedSpecialty={selectedSpecialty}
                selectedPrefecture={selectedPrefecture}
                minRating={minRating}
                minExperience={minExperience}
                onSpecialtyChange={handleSpecialtyChange}
                onPrefectureChange={handlePrefectureChange}
                onMinRatingChange={setMinRating}
                onMinExperienceChange={setMinExperience}
                onClearFilters={handleClearFilters}
                isFilterOpen={isFilterOpen}
                toggleFilter={toggleFilter}
              />
            </div>
          )}
          
          {/* Results */}
          <div className="md:col-span-3">
            {/* Mobile Filter Toggle */}
            {!isFilterOpen &&
              <div className="md:hidden mb-4">
                <Button
                  variant="secondary"
                  className="w-full flex items-center justify-between px-4 py-3"
                  onClick={toggleFilter}
                >
                <span className="font-medium flex items-center gap-2 text-indigo-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  {t('lawyers.filterLawyers')}
                </span>
                  <div className="bg-indigo-100 rounded-full h-6 w-6 flex items-center justify-center">
                    <svg
                      className={`h-4 w-4 text-indigo-700 transition-transform ${isFilterOpen ? 'transform rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </Button>
              </div>
            }
            
            {/* Results Count */}
            <div className="mb-4">
              <p className="text-gray-600">
                {pagination.total_items > 0
                  ? t('lawyers.foundResults', { count: pagination.total_items })
                  : t('lawyers.noResults')}
              </p>
            </div>
            
            {/* Lawyers Grid */}
            <LawyersList 
              lawyers={lawyers}
              loading={loading}
              error={error}
              onRetry={() => setSearchParams({ ...searchParams })}
            />
            
            {/* Pagination */}
            {!loading && lawyers.length > 0 && pagination.total_pages > 0 && (
              <div className="flex justify-center my-6">
                <Pagination 
                  currentPage={pagination.page}
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 