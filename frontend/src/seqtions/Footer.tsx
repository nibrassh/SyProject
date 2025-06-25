'use client'
import Link from "next/link"
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation('common')
  
  return (
    <footer className="sticky bottom-0 bg-gray-800 text-white py-3">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        <div className="flex justify-center space-x-6 mt-2">
          <Link href="/privacy" className="hover:text-blue-300">
            {t('footer.privacy')}
          </Link>
          <Link href="/terms" className="hover:text-blue-300">
            {t('footer.terms')}
          </Link>
          <Link href="/contact" className="hover:text-blue-300">
            {t('footer.contact')}
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer