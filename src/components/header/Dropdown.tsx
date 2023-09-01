import { useEffect, useRef, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { RiUserFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'

import Cart from '../cart'
import SignInForm from '../form/SignInForm'
import { AppDispatch, RootState } from '../../store/store'
import { logOut } from '../../slices/authSlice'
import Button from '../button'

function Dropdown() {
  const [isLoginDropDown, setIsLoginDropDown] = useState(false)
  const [isCartDropDown, setIsCartDropDown] = useState(false)
  const { auth, cart } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const totalOrderAmount = cart.cartArr.reduce((totalOrder, item) => {
    return totalOrder + item.orderAmount
  }, 0)

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsLoginDropDown(false)
      setIsCartDropDown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleLoginDropDown = () => {
    setIsLoginDropDown((prevState) => !prevState)
    setIsCartDropDown(false)
  }

  const toggleCartDropDown = () => {
    setIsCartDropDown((prevState) => !prevState)
    setIsLoginDropDown(false)
  }

  return (
    <div ref={dropdownRef}>
      <div className="flex">
        <Button
          onClick={toggleLoginDropDown}
          className={
            isLoginDropDown
              ? 'flex items-center m-3 font-bold border-b-2 border-stone-700'
              : 'flex items-center m-3 font-bold'
          }>
          {auth?.loginUser?.role ? (
            <div className="px-2.5 py-1 mb-1 uppercase items-center text-white bg-blue-600 rounded-full">
              {auth?.loginUser?.username.slice(0, 1)}
            </div>
          ) : (
            <>
              <RiUserFill size={20} className="mr-1" />
              Login
            </>
          )}
        </Button>

        {auth?.loginUser?.role !== 'ADMIN' && (
          <Button
            onClick={toggleCartDropDown}
            className={
              isCartDropDown
                ? 'flex items-center m-3 font-bold border-b-2 border-stone-700 relative'
                : 'flex items-center m-3 font-bold relative'
            }>
            <FaShoppingCart size={20} className="mr-1" />
            {cart?.cartArr.length > 0 && (
              <div className="absolute text-xs bg-yellow-400 rounded-full px-1 top-[-4px] right-3/4 translate-x-3/4">
                {totalOrderAmount}
              </div>
            )}
            Cart
          </Button>
        )}
      </div>

      {isLoginDropDown && !auth?.loginUser?.role && (
        <div className="z-10 right-0 top-32 absolute duration-300 bg-white shadow w-full p-20 lg:top-20 sm:max-w-[500px]">
          <SignInForm setIsLoginDropDown={toggleLoginDropDown} />
        </div>
      )}

      {isLoginDropDown && auth?.loginUser?.role && (
        <div className="z-10 right-0 top-32 absolute duration-300 bg-white shadow w-full p-20 lg:top-20 sm:max-w-[500px]">
          <div>Personal details</div>
          <div>{auth?.loginUser?.username} </div>
          <Button
            onClick={() => {
              dispatch(logOut())
              setIsLoginDropDown(!isLoginDropDown)
            }}
            className="mt-10 text-white uppercase bg-black focus:ring-4 focus:outline-none font-medium hover:bg-gray-800 text-sm max-w-full sm:w-auto px-5 py-2.5 text-center">
            Sign Out
          </Button>
        </div>
      )}

      {isCartDropDown && (
        <div className="z-10 right-0 top-32 absolute duration-300 bg-white shadow-lg w-full p-8 lg:top-20 sm:max-w-[400px]">
          <Cart setIsCartDropDown={toggleCartDropDown} />
        </div>
      )}
    </div>
  )
}

export default Dropdown
