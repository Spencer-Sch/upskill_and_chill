import { Outlet, Link } from '@remix-run/react'

export default function Screen() {
	return (
		<div className="flex flex-col justify-center items-center p-10 bg-primary-400 w-fit rounded-md">
			<Outlet />
			<div>
				Already have an account? <Link to="/login">Log In</Link>
			</div>
			<div>
				Need to create an account? <Link to="/register">Register</Link>
			</div>
		</div>
	)
}
