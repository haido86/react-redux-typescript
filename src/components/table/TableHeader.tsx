type TableHeaderProps = {
  headers: string[]
}

const TableHeader = ({ headers }: TableHeaderProps) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {headers.map((header, index) => (
          <th
            key={`header${index}`}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
