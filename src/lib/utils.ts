import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(title: string) {
  let slug = title.replace(/ - /g, '_')
  slug = slug.replace(/\s+/g, '-')
  return slug
}
