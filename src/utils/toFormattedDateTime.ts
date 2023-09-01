export const toFormattedDateTime = (dateString: string) => {
  const date = new Date(dateString)
  // Format the date and time
  const formattedDateTime = date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  return formattedDateTime
}
