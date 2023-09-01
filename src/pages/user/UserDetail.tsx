import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { findByUserById } from '../../slices/userSlice'
import { AppDispatch } from '../../store/store'

function UserDetail() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (id) {
      dispatch(findByUserById(+id))
    }
  }, [id])

  return (
    <div>
      <div>Customer</div>
      <div>Detail {id}</div>
    </div>
  )
}

export default UserDetail
