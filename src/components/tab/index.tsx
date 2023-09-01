type TabProps = {
  label: string
  active: boolean
  onClick: () => void
}

function Tab({ label, active, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-block p-4 ${
        active
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'
      } rounded-t-lg`}>
      {label}
    </button>
  )
}

export default Tab
