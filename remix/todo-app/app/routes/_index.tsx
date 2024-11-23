import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Todo App' },
		{ name: 'Upskill & Chill', content: 'Welcome to Upskill & Chill!' },
	]
}

export default function Index() {
	return (
		<div className="flex items-center justify-center h-full">
			<div className="flex flex-col items-center justify-center p-10 space-y-24 bg-orange/40">
				<h1 className="text-4xl text-darkBlue">Upskill & Chill: Remix!</h1>
				<div className="text-lg w-1/2">
					<p>
						Welcome to Upskill & Chill! Every Friday, we dive into web
						development technologies like Next.js, Remix, and TypeScript. Join
						us for a caffeine-fueled journey of coding, curiosity, and
						continuous learning.
					</p>
				</div>
			</div>
		</div>
	)
}
