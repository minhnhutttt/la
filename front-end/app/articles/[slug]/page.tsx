import {Metadata} from 'next'
import Link from 'next/link'
import articlesService from '../../../lib/server/articles'
import {Article} from '@/lib/types/articles'
import {getFullName} from "@/lib/types/users";
import {getTranslations, getLocale} from '@/lib/server/i18n';
import SocialShareButtons from '@/components/articles/SocialShareButtons';
import {RecommendedArticles} from "@/components/articles/RecommendedArticles";

type Props = {
  params: { slug: string }
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {t} = getTranslations()

  // Fetch article data
  try {
    const response = await articlesService.getArticleBySlug(params.slug)
    const article = response.data

    if (!article) {
      return {
        title: t('article.notFound.title')
      }
    }

    return {
      description: article.summary || article.title,
      openGraph: article.thumbnail ? {
        images: [{url: article.thumbnail}]
      } : undefined
    }
  } catch (error) {
    return {
      title: t('articles.title')
    }
  }
}

export default async function ArticleDetailPage({params}: Props) {
  const {t} = getTranslations()
  const slug = params.slug

  let article: Article | null = null
  let error: string | null = null

  try {
    const response = await articlesService.getArticleBySlug(slug)
    if (response.data) {
      article = response.data
    } else {
      error = t('article.notFound.message')
    }
  } catch (err) {
    console.error('Error fetching article:', err)
    error = t('article.error.loading')
  }


  if (error || !article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t('article.notFound.title')}
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          {t('article.notFound.message')}
        </p>
        <Link
          href="/articles"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {t('articles.article.backToArticles')}
        </Link>
      </div>
    )
  }

  const locale = getLocale()
  const formattedDate = new Date(article.published_at).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <>
      <div className="w-full py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-8">
            <Link
              href="/articles"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              <svg
                className="mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              {t("articles.article.backToArticles")}
            </Link>
          </div>

          {article.thumbnail && (
            <div className="mb-8 w-full h-64 md:h-80 overflow-hidden rounded-xl">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
            {t(`articles.categories.${article.category}`)}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          <div className="flex items-center mb-8">
            <div className="flex items-center">
              <div
                className="w-10 h-10 rounded-full mr-3 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold">
                {article.author.first_name?.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {getFullName(article.author)}
                </p>
                <p className="text-sm text-gray-500">{formattedDate}</p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* Using dangerouslySetInnerHTML as the content may contain HTML */}
            <div dangerouslySetInnerHTML={{__html: article.content}}/>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8">
            <h3 className="text-xl font-semibold mb-4">
              {t("articles.article.share")}
            </h3>
            <SocialShareButtons path={`/articles/${article.slug}`} title={article.title}/>
          </div>

          <RecommendedArticles currentArticle={article}/>
        </div>
      </div>
    </>
  );
}
