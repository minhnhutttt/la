'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-[#0094d9] text-white py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* ---------- ROW: Logo and tagline ---------- */}
        <div className="mb-10">
          <p className="mb-2 text-sm md:text-base">
            {t('common.lawyerChatConsultation')}
          </p>
          <div>
            <Image
              src="/images/logo-white.png"
              alt="Bengoshicchi Logo"
              width={200}
              height={60}
              className="object-contain"
            />
          </div>
        </div>

        {/* ---------- ROW: 2 columns ---------- */}
        <div className="space-y-6 md:space-y-0 md:flex md:justify-between md:items-start gap-10">
          {/* --- COL 1 -------------------------------- */}
          <div className="md:min-w-[275px]">
            {/* left-side links */}
            <ul className="space-y-6 text-xl">
              <li><Link href="/"          className="hover:underline">{t('common.home')}</Link></li>
              <li><Link href="/lawyers"   className="hover:underline">{t('common.findLawyer')}</Link></li>
              <li><Link href="/questions" className="hover:underline">{t('common.legalConsultation')}</Link></li>
              <li><Link href="/articles"  className="hover:underline">{t('common.legalBlog')}</Link></li>
            </ul>
          </div>

          {/* --- COL 2 -------------------------------- */}
          <div className="md:min-w-[275px]">
            {/* Right-side links */}
            <ul className="space-y-6 text-xl">
              <li><Link href="/about"   className="hover:underline">{t('common.aboutUs')}</Link></li>
              <li><Link href="/support" className="hover:underline">{t('common.contact')}</Link></li>
              <li><Link href="/privacy" className="hover:underline">{t('common.privacy')}</Link></li>
              <li><Link href="/terms"   className="hover:underline">{t('common.terms')}</Link></li>
            </ul>
          </div>
        </div>

        {/* copyright */}
        <div className="border-t border-blue-400 mt-12 pt-6 text-center text-sm">
          © 2025 べんごしっち
        </div>
      </div>
    </footer>
  )
}
