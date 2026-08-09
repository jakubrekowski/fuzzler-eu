import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Lightweight liveness endpoint for Railway; it deliberately avoids the DB. */
export function GET() {
  return NextResponse.json(
    { status: 'ok' },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}
