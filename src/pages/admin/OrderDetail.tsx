import { useEffect, useState } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Tab from '../../components/tab'
import { findOrderById } from '../../slices/orderSlice'
import { AppDispatch, RootState } from '../../store/store'
import UserDetail from '../user/UserDetail'
import ProductList from './ProductList'

function OrderDetail() {
  const { orders } = useSelector((state: RootState) => state)
  const [activeTab, setActiveTab] = useState<string>('Order Details')
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()

  useEffect(() => {
    if (id) dispatch(findOrderById(+id))
  }, [id])

  if (!id) {
    return <div>Order not found</div>
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <>
      <div className="ml-5 mb-5">
        <div className="flex">
          <button onClick={() => navigate('/orders')}>
            <IoArrowBackOutline size={20} />
          </button>
          <div className="p-2">Orders</div>
        </div>
        <div className="font-bold text-lg">{`Order ${orders.item?.id}`}</div>
        <div className="text-sm"> {`From ${orders.item?.user.username}`}</div>
      </div>
      <div className="border-t border-r border-l  border-gray-200 rounded-t-xl p-2">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <Tab
                onClick={() => handleTabClick('Order Details')}
                label={'Order Details'}
                active={activeTab === 'Order Details'}
              />
            </li>
            <li className="mr-2">
              <Tab
                onClick={() => {
                  handleTabClick('Products')
                }}
                label={'Products'}
                active={activeTab === 'products'}
              />
            </li>
          </ul>
          {activeTab === 'Products' && <ProductList />}
          {activeTab === 'Order Details' && <UserDetail />}
        </div>
      </div>
    </>
  )
}

export default OrderDetail
