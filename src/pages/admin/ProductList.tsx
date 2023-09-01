import { IoAdd } from 'react-icons/io5'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TableBody from '../../components/table/TableBody'
import TableHeader from '../../components/table/TableHeader'
import TableRow from '../../components/table/TableRow'
import { RootState } from '../../store/store'
import { Product } from '../../types/type'

function ProductList() {
  const { products } = useSelector((state: RootState) => state)
  const navigate = useNavigate()
  const keyExtractorProduct = (product: Product) => product.id

  const headers = ['', 'Name', 'Category', 'Price', 'Quantity', '']
  const renderCell = (item: Product) => (
    <>
      <th key={item.id}>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-md" src={item.image} alt={item.title} />
          </div>
          <div className="ml-4">
            <div>{item.title}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{item.category.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
      <td className="px-6 py-4 whitespace-nowrap">{item.inventory.quantity}</td>
      <th className="px-6 py-4 whitespace-nowrap">
        <button className="rounded-full hover:bg-slate-200 bg-none px-2 py-1">details</button>
      </th>
    </>
  )

  return (
    <div className="m-5">
      <div className="flex justify-between">
        <div className="text-3xl font-extrabold mb-5">Products</div>
        <div className="flex flex-1 justify-end mb-5">
          <button className="m-2 flex justify-between bg-violet-700 text-white w-32 h-10 py-2 px-5 rounded-full font-bold">
            <RiDeleteBinLine size={20} />
            <div>Remove</div>
          </button>
          <button
            onClick={() => {
              navigate('/products/new')
            }}
            className="m-2 flex justify-between bg-violet-700 text-white w-24 h-10 py-2 px-5 rounded-full font-bold">
            <IoAdd size={20} />
            <div>Add</div>
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <TableHeader headers={headers} />
                <TableBody
                  data={products?.items}
                  keyExtractor={keyExtractorProduct}
                  renderRow={(item: Product) => (
                    <TableRow key={item.id} item={item} renderCell={renderCell} />
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

export default ProductList
