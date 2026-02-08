'use client'

import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import Link from 'next/link'
import articlesService from '../../lib/services/articles'
import {Article, ARTICLE_CATEGORIES, ArticleCategory} from '@/lib/types'
import {Loader2, Search, ChevronDown} from 'lucide-react'

export default function ArticlesPage() {
  const {t} = useTranslation()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory | ''>('')

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const response = await articlesService.getArticles({
          status: 'published',
          query: searchTerm || undefined,
          category: selectedCategory || undefined
        })
        if (response.data) {
          setArticles(response.data)
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [searchTerm, selectedCategory])

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Already triggering search via the useEffect dependency
    }
  }

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
          <h1 className="text-4xl font-bold mb-6">
            {t('articles.title')}
          </h1>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400">
                  <Search size={18}/>
                </div>
                <input
                  type="text"
                  placeholder={t('articles.searchPlaceholder')}
                  className="w-full rounded-lg border-0 py-4 pl-10 pr-24 shadow-md focus:ring-2 focus:ring-indigo-500 text-gray-800 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyUp={handleSearch}
                />
              </div>

              <div className="relative w-full md:w-64">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400">
                    <ChevronDown size={18}/>
                  </div>
                  <select
                    id="category-filter"
                    className="w-full rounded-lg border-0 py-4 pl-10 pr-4 shadow-md focus:ring-2 focus:ring-indigo-500 text-gray-800 text-lg appearance-none"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as ArticleCategory | '')}
                  >
                    <option value="">{t('articles.allCategories')}</option>
                    {ARTICLE_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {t(`articles.categories.${category}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Content Section */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500"/>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.length === 0 && (
              <div className="col-span-3 text-center py-12 text-gray-500">
                {t('articles.noSearchResults')}
              </div>
            )}
            {articles.map((article) => (
              <a
                key={article.id}
                href={`/articles/${article.slug}`}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full cursor-pointer no-underline"
              >
                {article.thumbnail && (
                  <div className="block mb-4 w-full h-48 overflow-hidden rounded-lg">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <span
                    className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-3">
                    {t(`articles.categories.${article.category}`)}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
