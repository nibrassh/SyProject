// app/api/opportunities/route.ts
import { NextResponse } from 'next/server'
import { opportunities } from '@/data/fakeData'

export async function GET() {
  return NextResponse.json(opportunities)
}