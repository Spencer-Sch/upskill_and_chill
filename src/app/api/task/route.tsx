import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/client'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const task = await prisma.task.create({
    data: {
      ...body
    }
  })
  return NextResponse.json(task, { status: 201 })
}