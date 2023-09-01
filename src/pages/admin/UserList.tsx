import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../slices/userSlice'
import { AppDispatch, RootState } from '../../store/store'

import TableHeader from '../../components/table/TableHeader'
import TableBody from '../../components/table/TableBody'
import TableRow from '../../components/table/TableRow'
import { User } from '../../types/type'

function UserList() {
  const { users, auth } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const [buttonStates, setButtonStates] = useState<{ [userId: number]: string }>(
    users?.usersData?.reduce((acc, user) => ({ ...acc, [user.id]: 'Ban this user' }), {})
  )

  if (!auth || !auth.loginUser || auth?.loginUser?.role !== 'ADMIN') {
    return <div>Cannot access this page</div>
  }

  const handleButtonChange = (userId: number) => {
    setButtonStates((prevButtonStates) => ({
      ...prevButtonStates,
      [userId]: prevButtonStates[userId] === 'Ban this user' ? 'Unbanned' : 'Ban this user'
    }))
  }

  const keyExtractorUser = (user: User) => user.id

  const headers = ['', 'User ID', 'Username', 'Ban User']
  const renderCell = (user: User) => (
    <>
      <th>{user.index + 1}</th>
      <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
      <td key={user.id} className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() => handleButtonChange(user.id)}
          className={
            buttonStates[user.id] === 'Unbanned'
              ? 'bg-red-600  text-white rounded-full px-2.5 py-1 cursor-pointer font-semibold text-sm'
              : 'bg-green-600 text-black rounded-full px-2.5 py-1 cursor-pointer font-semibold text-sm'
          }>
          {buttonStates[user.id] ? buttonStates[user.id] : 'Ban this user'}
        </button>
      </td>
    </>
  )

  return (
    <div className="m-5">
      <h2 className="text-3xl font-[700] mb-5">User List</h2>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <TableHeader headers={headers} />
                <TableBody
                  keyExtractor={keyExtractorUser}
                  data={
                    users?.filteredUserArr.length > 0 ? users?.filteredUserArr : users?.usersData
                  }
                  renderRow={(user, index) => (
                    <TableRow key={user.id} item={{ ...user, index }} renderCell={renderCell} />
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

export default UserList
