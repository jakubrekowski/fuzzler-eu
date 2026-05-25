import React from 'react'
import {
  HIGHLIGHT_REGEX,
  isHighlightedPart,
} from '@/components/HighlightedText'

/** Lexical text format flags (mirrors @payloadcms/richtext-lexical NodeFormat) */
const IS_BOLD = 1
const IS_ITALIC = 1 << 1
const IS_STRIKETHROUGH = 1 << 2
const IS_UNDERLINE = 1 << 3
const IS_CODE = 1 << 4
const IS_SUBSCRIPT = 1 << 5
const IS_SUPERSCRIPT = 1 << 6

function applyTextFormat(content: React.ReactNode, format: number): React.ReactNode {
  let text = content

  if (format & IS_BOLD) {
    text = <strong>{text}</strong>
  }
  if (format & IS_ITALIC) {
    text = <em>{text}</em>
  }
  if (format & IS_STRIKETHROUGH) {
    text = <span style={{ textDecoration: 'line-through' }}>{text}</span>
  }
  if (format & IS_UNDERLINE) {
    text = <span style={{ textDecoration: 'underline' }}>{text}</span>
  }
  if (format & IS_CODE) {
    text = <code>{text}</code>
  }
  if (format & IS_SUBSCRIPT) {
    text = <sub>{text}</sub>
  }
  if (format & IS_SUPERSCRIPT) {
    text = <sup>{text}</sup>
  }

  return text
}

function renderFormattedText(rawText: string, format: number): React.ReactNode {
  const parts = rawText.split(HIGHLIGHT_REGEX)

  if (parts.length === 1) {
    return applyTextFormat(rawText, format)
  }

  return parts.map((part, i) => {
    if (!part) return null

    if (isHighlightedPart(part)) {
      const highlighted = (
        <span key={i} className="text-orange">
          {part.slice(2, -2)}
        </span>
      )
      return applyTextFormat(highlighted, format)
    }

    return <React.Fragment key={i}>{applyTextFormat(part, format)}</React.Fragment>
  })
}

export const highlightedTextJSXConverter = {
  text: ({ node }: { node: { text: string; format: number } }) => {
    return renderFormattedText(node.text, node.format)
  },
}
