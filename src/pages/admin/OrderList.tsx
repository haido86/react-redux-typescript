import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableBody from '../../components/table/TableBody'
import TableHeader from '../../components/table/TableHeader'
import TableRow from '../../components/table/TableRow'
import { fetchOrders } from '../../slices/orderSlice'
import { AppDispatch, RootState } from '../../store/store'
import { Order } from '../../types/type'
import { toFormattedDateTime } from '../../utils/toFormattedDateTime'

function OrderList() {
  const { orders } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

  const keyExtractorOrder = (order: Order) => order.id

  const headers = ['', 'ID', 'Customer', 'Total Payment', 'Date']
  const renderCell = (order: Order) => (
    <>
      <th key={order.id}>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div>{order.id}</div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{order.user.username}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {order.orderItemList
          .reduce((total, item) => {
            return total + item.product.price * item.quantity
          }, 0)
          .toFixed(2)}{' '}
        €
      </td>
      <th className="px-6 py-4 whitespace-nowrap">{toFormattedDateTime(`${order.purchaseAt}`)}</th>
    </>
  )

  return (
    <div className="m-5">
      <div className="text-3xl font-extrabold mb-5">Orders</div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <TableHeader headers={headers} />
                <TableBody
                  data={orders?.items}
                  keyExtractor={keyExtractorOrder}
                  renderRow={(order: Order) => (
                    <TableRow key={order.id} item={order} renderCell={renderCell} />
                  )}
                />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderList
