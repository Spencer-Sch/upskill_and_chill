import { Form, Link, NavLink, useLocation } from '@remix-run/react'
import Button from '~/components/Button'
import { links } from '~/constants/constants'

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
	const location = useLocation()

	const showLoginButton = location.pathname !== '/login' && !isLoggedIn

	const showLogoutButton = location.pathname !== '/login' && isLoggedIn

	return (
		<header className="flex justify-between items-center p-8 bg-primary-500">
			<div className="w-1/5">
				<p className="text-2xl text-orange py-2">Upskill & Chill</p>
			</div>
			<nav className="w-3/5">
				<ul className="w-100 flex justify-center gap-6">
					{links.map(({ label, path }) => (
						<li key={label}>
							<NavLink
								to={path}
								className={({ isActive }) =>
									isActive
										? 'text-vanilla border-solid border-vanilla border-[2px] py-1 px-3 rounded-md'
										: 'text-gray-200 border-transparent border-[2px] py-1 px-3 rounded-md hover:bg-vanilla hover:text-darkBlue'
								}
							>
								{label}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
			<div className="w-1/5 flex justify-end">
				{showLoginButton && (
					<Link
						to="/login"
						className="button"
						// className="flex justify-center items-center space-x-2 hover:bg-secondary-600 py-2 rounded-md bg-secondary-500"
					>
						Log In
					</Link>
				)}
				{showLogoutButton && (
					<Form method="post" action="/logout">
						<Button label="Log Out" type="submit" />
					</Form>
				)}
			</div>
		</header>
	)
}
