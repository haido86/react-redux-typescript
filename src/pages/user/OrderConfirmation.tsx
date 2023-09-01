import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../components/button'

import { RootState } from '../../store/store'

function OrderConfirmation() {
  const { orders, auth } = useSelector((state: RootState) => state)

  const returnTotal = orders?.item?.orderItemList.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)

  return (
    <div className="w-full sm:px-[70px]">
      {auth?.loginUser?.role === 'USER' ? (
        <>
          <div className="font-bold text-xl mb-5">Confirm your order</div>
          {orders?.item?.orderItemList.map((item) => (
            <div key={item.id} className="flex pb-3 pt-3 border-b border-b-gray-100">
              <img className="max-w-[80px]" src={item.product.image} alt={item.product.title} />
              <div className="flex-1 ml-3">
                <div className="text-sm uppercase mt-2 hover:underline">
                  <Link to={`/products/${item.id}`}>{`${item.product.title}`.slice(0, 20)}</Link>
                </div>
                <div className="text-sm text-gray-500">{`${item.product.price} €`}</div>
                <div className="flex items-center mt-2 w-[100px] justify-between px-2 py-1 text-sm">
                  Quantity: {item.quantity}
                </div>
              </div>
              <div className="flex flex-col justify-between mt-2 items-end w-[80px]">
                <div className="text-red-500">{`${(item.product.price * item.quantity).toFixed(
                  2
                )} €`}</div>
              </div>
            </div>
          ))}
          {returnTotal && (
            <div className="flex justify-between border-b-gray-200 border-b mb-5">
              <div className="font-bold mt-3">Total</div>
              <div className="font-bold mt-3 text-red-500">{`${returnTotal.toFixed(2)} €`}</div>
            </div>
          )}
          <div className="flex justify-between mt-10">
            <Button className="font-bold border bg-white text-black px-3 py-1.5 rounded-md">
              Cancel
            </Button>
            <Button className="font-bold border px-3 py-1.5 text-white bg-black rounded-md">
              Proceed to Payment
            </Button>
          </div>
        </>
      ) : (
        <div>Please Login again</div>
      )}
    </div>
  )
}

export default OrderConfirmation
