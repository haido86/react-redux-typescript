type TableBodyProps<T> = {
  data: T[]
  renderRow: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T) => string | number
}

function TableBody<T>({ data, renderRow, keyExtractor }: TableBodyProps<T>) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">{data.map(renderRow, keyExtractor)}</tbody>
  )
}

export default TableBody
