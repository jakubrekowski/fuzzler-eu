import type { Category, Post } from '@/payload-types'

export const CATEGORY_BADGE_COLORS = [
  'orange',
  'red',
  'purple',
  'green',
  'white',
  'cream',
] as const

export type CategoryBadgeColor = (typeof CATEGORY_BADGE_COLORS)[number]

export const CATEGORY_BADGE_PALETTE: Record<
  CategoryBadgeColor,
  { background: string; foreground: string }
> = {
  orange: { background: '#FF9A42', foreground: '#2D2D2A' },
  red: { background: '#F84949', foreground: '#FFFFFF' },
  purple: { background: '#4B0082', foreground: '#FFFFFF' },
  green: { background: '#79E69C', foreground: '#2D2D2A' },
  white: { background: '#FFFFFF', foreground: '#2D2D2A' },
  cream: { background: '#E8E2D6', foreground: '#2D2D2A' },
}

export const DEFAULT_CATEGORY_BADGE_COLOR: CategoryBadgeColor = 'orange'

export function getPrimaryCategory(
  post: Pick<Post, 'categories'>,
): Category | null {
  const cat = post.categories?.[0]
  return cat && typeof cat === 'object' ? cat : null
}

/** @deprecated Use getPrimaryCategory(post)?.title */
export function getCategoryLabel(post: Pick<Post, 'categories'>): string {
  return getPrimaryCategory(post)?.title ?? ''
}

export function resolveCategoryBadgeColor(
  category?: Category | null,
): CategoryBadgeColor {
  const value = category?.badgeColor
  if (value && CATEGORY_BADGE_COLORS.includes(value as CategoryBadgeColor)) {
    return value as CategoryBadgeColor
  }
  return DEFAULT_CATEGORY_BADGE_COLOR
}

export function getCategoryBadgeStyles(color: CategoryBadgeColor) {
  return CATEGORY_BADGE_PALETTE[color] ?? CATEGORY_BADGE_PALETTE.orange
}

export function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '')
  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/** Whether a hex color reads as dark on the site’s dark backgrounds (e.g. post hero). */
export function isDarkBadgeColor(hex: string): boolean {
  const normalized = hex.replace('#', '')
  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance < 0.55
}
