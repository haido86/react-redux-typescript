import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  return (
    <div className="flex flex-wrap p-5">
      <button
        onClick={() => navigate('/products')}
        className="border-gray-400 shadow-lg rounded-2xl m-8 px-12 py-16 font-bold text-3xl hover:bg-slate-100 hover:cursor-pointer text-blue-500">
        Product List
      </button>
      <button
        onClick={() => navigate('/users')}
        className="border-gray-400 shadow-lg rounded-2xl m-8 px-12 py-16 font-bold text-3xl hover:bg-slate-100 hover:cursor-pointer text-yellow-500">
        User List
      </button>
      <button
        onClick={() => navigate('/orders')}
        className="border-gray-400 shadow-lg rounded-2xl m-8 px-12 py-16 font-bold text-3xl hover:bg-slate-100 hover:cursor-pointer text-red-500">
        Order List
      </button>
    </div>
  )
}

export default Dashboard
