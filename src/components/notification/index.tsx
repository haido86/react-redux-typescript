import { memo } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../store/store'

function Notification() {
  const { notification } = useSelector((state: RootState) => state)

  return (
    <>
      <div>
        {notification.isShow && (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert">
            {notification.content}
          </div>
        )}
      </div>
    </>
  )
}

export default memo(Notification)
