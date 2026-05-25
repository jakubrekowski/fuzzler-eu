import type { Post } from '@/payload-types'

const WORDS_PER_MINUTE = 200

function extractTextFromLexicalNode(node: unknown): string {
  if (!node || typeof node !== 'object') return ''

  const n = node as Record<string, unknown>

  if (n.type === 'text' && typeof n.text === 'string') {
    return n.text
  }

  if (Array.isArray(n.children)) {
    return n.children.map(extractTextFromLexicalNode).join(' ')
  }

  if (n.fields && typeof n.fields === 'object') {
    const fields = n.fields as Record<string, unknown>
    if (fields.content) {
      return extractTextFromLexicalNode(fields.content)
    }
  }

  if (n.root) {
    return extractTextFromLexicalNode(n.root)
  }

  return ''
}

export function getReadingTimeMinutes(content?: Post['content'] | null): number {
  const text = extractTextFromLexicalNode(content?.root)
  const words = text.trim().split(/\s+/).filter(Boolean).length

  if (words === 0) return 1

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

export function formatReadingTimePl(minutes: number): string {
  if (minutes === 1) return '1 min czytania'
  return `${minutes} min czytania`
}

export function formatReadingTimeShortPl(minutes: number): string {
  if (minutes === 1) return '1 min'
  return `${minutes} min`
}
