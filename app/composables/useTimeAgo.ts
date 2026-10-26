export const useTimeAgo = () => {
  const timeAgo = (value: string | Date) => {
    const date = new Date(value)
    const diff = Date.now() - date.getTime()
    const minutes = Math.max(1, Math.floor(diff / 60000))

    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
    }

    const hours = Math.floor(minutes / 60)

    if (hours < 24) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`
    }

    const days = Math.floor(hours / 24)
    return `${days} day${days === 1 ? '' : 's'} ago`
  }

  return { timeAgo }
}
