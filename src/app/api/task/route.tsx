import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/client'
// import { v4 } from 'uuid'
import { randomUUID } from 'crypto'

export async function POST(request: NextRequest) {
	const body = await request.json()
	const createdAt = Date.now().toString()
	const id = randomUUID()
	const task = await prisma.task.create({
		data: {
			...body,
			createdAt,
			id
		},
	})
	return NextResponse.json(task, { status: 201 })
}
