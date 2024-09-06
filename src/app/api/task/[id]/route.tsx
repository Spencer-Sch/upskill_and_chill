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
    const task = await prisma.task.findUnique({
      where: {
        id: params.id
      }
    })
    return NextResponse.json(task, { status: 200 })
}

export async function DELETE(
  request: NextRequest,
  { params }: ReqParams) {
    const deletedTask = await prisma.task.delete({
      where: {
        id: params.id
      }
    })
    console.log(deletedTask)
    return new Response(null, { status: 204 })
  }