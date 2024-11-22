interface ValidationMessageProps {
  message: string
  type?: 'error' | 'warning' | 'success'
}

export function ValidationMessage({ message, type = 'error' }: ValidationMessageProps) {
  const styles = {
    error: 'text-red-500',
    warning: 'text-yellow-500',
    success: 'text-green-500'
  }

  return (
    <p className={`text-sm ${styles[type]}`}>
      {message}
    </p>
  )
} 