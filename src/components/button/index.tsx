type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onSubmit?: React.FormEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit'
  children: React.ReactNode
  className?: string
}
function Button({ onClick, onSubmit, className, type, children }: ButtonProps) {
  return (
    <button onClick={onClick} onSubmit={onSubmit} type={type} className={className}>
      {children}
    </button>
  )
}

export default Button
