import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Cart from '../../components/cart'
import { RootState } from '../../store/store'

function CheckOut() {
  const { auth } = useSelector((state: RootState) => state)

  return (
    <div className="min-h-screen">
      {auth?.loginUser?.role !== 'USER' ? (
        <div className="text-xl m-20">
          Please{' '}
          <Link to="/signin" className="hover:underline font-bold italic">
            Login
          </Link>{' '}
          or{' '}
          <Link to="/signup" className="hover:underline font-bold italic">
            Become our member
          </Link>{' '}
          to proceed
        </div>
      ) : (
        <div className="font-bold text-xl m-20">
          <div>Check Out Process</div>
          <Cart />
        </div>
      )}
    </div>
  )
}

export default CheckOut
