type TableRowProps<T> = {
  item: T
  renderCell: (item: T) => React.ReactNode
}

function TableRow<T>({ item, renderCell }: TableRowProps<T>) {
  return <tr>{renderCell(item)}</tr>
}

export default TableRow
