import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(title: string) {
  let slug = title.replace(/ - /g, '_')
  slug = slug.replace(/\s+/g, '-')
  return slug
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  return format(date, 'd MMMM yyyy')
}

export function currencyFormat(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(value)
}
