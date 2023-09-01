import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../store/store'
import { login } from '../../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import Button from '../button'

function SignInForm({
  setIsLoginDropDown,
  redirectToCheckout
}: {
  setIsLoginDropDown?: React.Dispatch<React.SetStateAction<boolean>>
  redirectToCheckout?: boolean
}) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const signIn = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(login({ username, password }))
    if (setIsLoginDropDown) {
      setIsLoginDropDown(false)
    }
    if (redirectToCheckout) {
      navigate('/checkout')
    }
  }

  const handleNavigateToSignUp = () => {
    if (setIsLoginDropDown) setIsLoginDropDown(false)
    navigate('/signup')
  }

  return (
    <div className=" bg-white w-full lg:top-20 sm:max-w-[500px]">
      <h2 className="text-xl font-bold mb-2">Sign In</h2>
      <p className="pb-6 text-sm flex">
        Become a Member - You will enjoy exclusive deals, offers, invites and rewards.
      </p>
      <form onSubmit={signIn}>
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
            Your username <span className="text-red-500">*</span>
          </label>
          <input
            type="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
            placeholder="username"
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Your password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  block w-full p-2.5"
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="flex items-start mt-6 mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3"
            />
          </div>
          <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 ">
            Remember me
          </label>
        </div>
        <div className="flex flex-col">
          <Button
            type="submit"
            className="text-white bg-black focus:ring-4 focus:outline-none font-bold hover:bg-gray-800 text-sm max-w-full sm:w-auto px-5 py-2.5 text-center">
            Sign In
          </Button>
          <Button
            onClick={handleNavigateToSignUp}
            className="mt-3 bg-white focus:outline-none font-bold  text-sm max-w-full border border-black sm:w-auto px-5 py-2.5 text-center">
            Become our Member
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
