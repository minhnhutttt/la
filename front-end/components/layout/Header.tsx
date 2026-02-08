'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import LanguageSelector from './LanguageSelector'
import { useAuthStore } from '@/store/auth-store'
import {getFullName, User} from "@/lib/types";
import { Button } from '@/components/ui/button';

export default function Header({ showLanguageSelector = true }: { showLanguageSelector?: boolean } = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [authState, setAuthState] = useState<{ user: User | null, isAuthenticated: boolean }>({ user: null, isAuthenticated: false })
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()
  const { user, isAuthenticated, logout, checkAuth } = useAuthStore()
  const isLawyer = authState.user?.role === 'lawyer'
  const isAdmin = authState.user?.role === 'admin'
  const hasNewAppointment = authState.user?.has_new_appointment === true

  const isActive = (path: string) => pathname === path

  // Update local state whenever auth state changes
  useEffect(() => {
    setAuthState({ user, isAuthenticated })
  }, [user, isAuthenticated])

  // Force auth check when component mounts or route changes
  useEffect(() => {
    checkAuth()
  }, [checkAuth, pathname])

  const handleLogout = async () => {
    await logout()
    router.refresh() // Force router refresh after logout
  }

  const list = [
    {
      href: '/',
      text: t('common.home'),
      isAuthenticated: false
    },
    {
      href: '/lawyers',
      text: t('lawyers.findLawyers'),
      isAuthenticated: false,
      excludeForLawyer: true
    },
    {
      href: '/questions',
      text: t('common.questions'),
      isAuthenticated: false
    },
    {
      href: '/articles',
      text: t('common.articles'),
      isAuthenticated: false
    },
    // Removed appointments menu item as it's now integrated into profile
  ]

  // Exclude "Find Lawyers" for lawyer users
  const navList = list

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex flex-col items-start">
              <div className="text-sm mb-1 text-gray-600">弁護士へのチャット相談なら</div>
              <Image
                src="/images/logo.png"
                alt="べんごレッチ"
                width={160}
                height={40}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center">
              {navList.map((item, index) => (
                (!item.isAuthenticated || authState.isAuthenticated) && (
                  <React.Fragment key={item.href}>
                    <li>
                      <Link
                        href={item.href}
                        className={`text-sm font-medium relative ${
                          isActive(item.href) ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        {item.text}
                        {item.href === '/appointments' && hasNewAppointment && (
                          <span className="absolute -top-1 -right-3 h-2 w-2 bg-red-600 rounded-full"></span>
                        )}
                      </Link>
                    </li>
                    {index < navList.length - 1 && (
                      <li className="mx-6 text-gray-300">|</li>
                    )}
                  </React.Fragment>
                )
              ))}
            </ul>
          </nav>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex md:items-center md:space-x-3 ml-8">
            {showLanguageSelector && <LanguageSelector />}
            {authState.isAuthenticated && authState.user ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="rounded-md px-4 py-2 text-base font-medium text-blue-600 hover:bg-blue-50"
                  >
                    {t('admin.title')}
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="rounded-md px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 relative"
                >
                  {getFullName(authState.user)}
                  {hasNewAppointment && (
                    <span className="absolute -top-0.5 h-2 w-2 bg-red-600 rounded-full"></span>
                  )}
                </Link>
                <Button
                  variant="primary"
                  onClick={handleLogout}
                >
                  {t('auth.signOut')}
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  {t('auth.signIn')}
                </Link>
                <Link
                  href="/auth/register"
                  className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
                >
                  {t('auth.signUp')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">{t('common.openMenu')}</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white z-50 shadow-lg" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navList.map((item) => (
              (!item.isAuthenticated || authState.isAuthenticated) && 
              (!item.excludeForLawyer || !isLawyer) && (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    isActive(item.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.text}
                  {item.href === '/appointments' && hasNewAppointment && (
                    <span className="inline-flex ml-2 h-2 w-2 bg-red-600 rounded-full"></span>
                  )}
                </Link>
              )
            ))}
            <hr/>
            
            {showLanguageSelector && (
              <div className="block rounded-md px-3 py-2">
                <LanguageSelector className="w-full justify-start" />
              </div>
            )}

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block rounded-md px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('admin.title')}
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 relative"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('auth.myAccount')}
                  {hasNewAppointment && (
                    <span className="inline-flex ml-2 h-2 w-2 bg-red-600 rounded-full"></span>
                  )}
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 justify-start"
                >
                  {t('auth.signOut')}
                </Button>
              </>
            ) : (
              <>
               <Link
                 href="/auth/login"
                 className="block w-full rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                 onClick={() => setIsMenuOpen(false)}
               >
                  {t('auth.signIn')}
                </Link>
                <Link
                  href="/auth/register"
                  className="inline-block rounded-md bg-amber-500 px-4 py-2 ml-2 text-base font-medium text-white hover:bg-amber-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('auth.signUp')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
