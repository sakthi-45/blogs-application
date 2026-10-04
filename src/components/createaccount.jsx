import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import axios from 'axios'
import { API_BASE_URL } from '../data/api'

function withTimeout(promise, timeoutMs, message) {
	return new Promise((resolve, reject) => {
		const timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs)

		Promise.resolve(promise).then(
			(value) => {
				clearTimeout(timeoutId)
				resolve(value)
			},
			(error) => {
				clearTimeout(timeoutId)
				reject(error)
			},
		)
	})
}

function CreateAccountPage() {
	const navigate = useNavigate()
	const [errorMessage, setErrorMessage] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState('')

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [role, setRole] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()
		setErrorMessage('')
		setIsSubmitting(true)
		setSubmitStatus('Creating your account...')

		const formData = new FormData(event.currentTarget)
		const name = formData.get('name').trim()
		const email = formData.get('email').trim()
		const password = formData.get('password')
		const role = formData.get('role')

		try {
			const { user } = await createUserWithEmailAndPassword(auth, email, password)
			setSubmitStatus('Saving your role...')
			
			const response = await axios.post(`${API_BASE_URL}/api/users`, {
				uid: user.uid,
				name: name,
				email: email,
				role: role,
			})

			console.log('User role saved:', response.data)
			navigate('/login')
		} catch (error) {
			setErrorMessage(error.message || 'Unable to create your account. Please try again.')
		} finally {
			setIsSubmitting(false)
			setSubmitStatus('')
		}
	}

	return (
		<div className="flex min-h-[70vh] items-center justify-center pb-10 pt-6 sm:pt-8">
			<section className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-10">
				<p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-600">Join InkSpace</p>
				<h1 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-slate-900">Create your account</h1>
				<p className="mt-3 text-sm leading-6 text-slate-600">Choose how you want to take part in the community.</p>

				<form className="mt-8 space-y-5" onSubmit={handleSubmit}>
					<label className="block">
						<span className="mb-2 block text-sm font-medium text-slate-700">Role</span>
						<select
							name="role"
							defaultValue="Reader"
							required
							className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
							onChange={(event) => setRole(event.target.value)}
						>
							<option value="Reader">Reader</option>
							<option value="Author">Author</option>
						</select>
					</label>

					<label className="block">
						<span className="mb-2 block text-sm font-medium text-slate-700">Name</span>
						<input
							type="text"
							name="name"
							autoComplete="name"
							required
							placeholder="Your name"
							className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
							onChange={(event) => setName(event.target.value)}
						/>
					</label>

					<label className="block">
						<span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
						<input
							type="email"
							name="email"
							autoComplete="email"
							required
							placeholder="you@example.com"
							className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
							onChange={(event) => setEmail(event.target.value)}
						/>
					</label>

					<label className="block">
						<span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
						<input
							type="password"
							name="password"
							autoComplete="new-password"
							minLength={8}
							required
							placeholder="At least 8 characters"
							className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white"
						/>
					</label>

					{errorMessage && <p className="text-sm text-red-600" role="alert">{errorMessage}</p>}
					{submitStatus && <p className="text-sm text-slate-600" role="status">{submitStatus}</p>}

					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full rounded-full bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500"
					>
						{isSubmitting ? submitStatus : 'Create account'}
					</button>
				</form>
			</section>
		</div>
	)
}

export default CreateAccountPage
