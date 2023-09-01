import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { IoShirtSharp } from 'react-icons/io5'
import { HiUsers } from 'react-icons/hi2'
import { FiPackage } from 'react-icons/fi'
import { RiMenuFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { filteredProductsAction } from '../../slices/productsSlice'
import { AppDispatch, RootState } from '../../store/store'
import Button from '../button'

function Navbar() {
  const { products, auth } = useSelector((state: RootState) => state)
  const navigate = useNavigate()
  const [nav, setNav] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer flex flex-col place-items-center hover:rounded-full w-auto h-auto px-4 py-2 font-bold">
        <RiMenuFill size={30} />
        Menu
      </div>
      {nav && <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>}
      <div
        className={
          nav
            ? 'fixed top-0 left-0 w-[300px] h-screen z-10 duration-300 bg-white'
            : 'fixed top-0 left-[-100%] w-[300px] h-screen z-10 duration-300 bg-white'
        }>
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          className="absolute right-4 top-4 cursor-pointer"
          size={30}
        />
        <h2 className="text-2xl p-4">
          <span className="font-bold">Hai</span>Do <span className="font-bold">W</span>elcome!
        </h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            {auth?.loginUser?.role === 'ADMIN' ? (
              <>
                <div>
                  <Button
                    onClick={() => {
                      setNav(!nav)
                      navigate('/dashboard')
                    }}
                    className="font-bold uppercase text-violet-700">
                    Dashboards
                  </Button>
                </div>
                <div className="flex text-xl py-4">
                  <IoShirtSharp size={25} className="mr-4" />
                  <h3>
                    <Button
                      onClick={() => {
                        setNav(!nav)
                        navigate('/products')
                      }}>
                      Products
                    </Button>
                  </h3>
                </div>
                <div className="flex text-xl py-4">
                  <HiUsers size={25} className="mr-4" />
                  <h3>
                    <Button
                      onClick={() => {
                        setNav(!nav)
                        navigate('/users')
                      }}>
                      Users
                    </Button>
                  </h3>
                </div>
                <div className="flex text-xl py-4">
                  <HiUsers size={25} className="mr-4" />
                  <h3>
                    <Button
                      onClick={() => {
                        setNav(!nav)
                        navigate('/orders')
                      }}>
                      Orders
                    </Button>
                  </h3>
                </div>
              </>
            ) : (
              <li className="text-xl py-4 flex flex-col ">
                <div className="flex ">
                  <IoShirtSharp size={25} className="mr-4" />
                  <h3>
                    <Button
                      onClick={() => {
                        setNav(!nav)
                      }}>
                      Products
                    </Button>
                  </h3>
                </div>
                <ul className="flex flex-col pl-14 text-lg pt-2">
                  {products?.categories.map((category) => (
                    <li key={category.id} className="py-1 ">
                      <Button
                        onClick={() => {
                          setNav(!nav)
                          dispatch(filteredProductsAction(category.name))
                        }}
                        className="capitalize hover:underline">
                        {category.name.toLowerCase()}
                      </Button>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
