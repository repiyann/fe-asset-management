import { BookOpen, Settings2 } from 'lucide-react'
import localFont from 'next/font/local'

export const sidebarCollapsible = {
  title: 'Masters',
  url: '#',
  icon: BookOpen,
  isActive: true,
  items: [
    {
      title: 'Locations',
      url: '/dashboard/locations',
    },
    {
      title: 'Categories',
      url: '/dashboard/categories',
    },
    {
      title: 'Fixed Assets',
      url: '/dashboard/fixed-assets',
    },
    {
      title: 'Depreciations',
      url: '/dashboard/depreciations',
    },
    {
      title: 'Accumulation Depreciations',
      url: '/dashboard/accumulation-depreciations',
    },
  ],
}

export const sidebar = [
  { title: 'Transactions', url: '/transactions', icon: Settings2 },
  { title: 'History Transactions', url: '/history-transactions', icon: Settings2 },
]

export const geistSans = localFont({
  src: '../app/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

export const geistMono = localFont({
  src: '../app/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})
