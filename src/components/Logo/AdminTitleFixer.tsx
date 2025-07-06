'use client'
import { useEffect } from 'react'

export function AdminTitleFixer() {
  useEffect(() => {
    const updateTitle = () => {
      const parts = document.title.split('–')
      const pageName = parts[0].trim()
      document.title = pageName ? `${pageName} – Qorepay Admin` : 'Qorepay Admin'
    }
    updateTitle()
    window.addEventListener('popstate', updateTitle)
    return () => window.removeEventListener('popstate', updateTitle)
  }, [])
  return null
}
