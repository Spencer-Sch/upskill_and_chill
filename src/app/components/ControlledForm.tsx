'use client'
import React, { useState, FormEvent, ChangeEvent } from 'react'

const ControlledForm = () => {
	const [state, setState] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		conditionsAccepted: false,
	})

	const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
		let value: (typeof state)[keyof typeof state] = event.target.value
		/*
		 * (typeof state)
		 * used on an object returns { [key: string]: any }
		 *
		 * [keyof typeof state]
		 * creates a union type of all possible keys of the type obtained from (typeof state)
		 * if "state" was { count: number; name: string } then [keyof typeof state] would result in the type "count" | "name"
		 *
		 * (typeof state)[keyof typeof state]
		 * this expression uses the resulting union type as an index into the type of state.
		 * This means it selects one property at a time from the type of state
		 *
		 * */
		if (event.target.type === 'checkbox') {
			value = event.target.checked
		}

		setState({ ...state, [event.target.id]: value })
	}

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		console.log(state)
	}

	return (
		<form className="form" onSubmit={onSubmit}>
			<div className="field">
				<label htmlFor="name">Name</label>
				<input id="name" onChange={onFieldChange} />
			</div>
			<div className="field">
				<label htmlFor="email">Email</label>
				<input type="email" id="email" onChange={onFieldChange} />
			</div>
			<div className="field">
				<label htmlFor="password">Password</label>
				<input type="password" id="password" onChange={onFieldChange} />
			</div>
			<div className="field">
				<label htmlFor="confirmPassword">Confirm password</label>
				<input type="password" id="confirmPassword" onChange={onFieldChange} />
			</div>
			<div className="field checkbox">
				<input type="checkbox" id="conditions" onChange={onFieldChange} />
				<label htmlFor="conditions">I agree to the terms and conditions</label>
			</div>
			<button type="submit">Sign up</button>
		</form>
	)
}

export default ControlledForm
