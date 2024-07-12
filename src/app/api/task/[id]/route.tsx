import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/client'

interface ReqParams {
  params: {
    id: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: ReqParams) {
    console.log(params)
    const task = await prisma.task.findUnique({
      where: {
        id: params.id
      }
    })
    return NextResponse.json(task, { status: 200 })
}