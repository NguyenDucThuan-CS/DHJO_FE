import { toast } from 'react-toastify'

export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export const errorToast = (mess: string) => {
  return toast.error(mess, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}

export const successToast = (mess: string) => {
  return toast.success(mess, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  })
}

export function timeSince(date: any) {
  if (typeof date !== 'object') {
    date = new Date(date)
  }

  var seconds = Math.floor((new Date() - date) / 1000)
  var intervalType

  var interval = Math.floor(seconds / 31536000)
  if (interval >= 1) {
    intervalType = 'year'
  } else {
    interval = Math.floor(seconds / 2592000)
    if (interval >= 1) {
      intervalType = 'month'
    } else {
      interval = Math.floor(seconds / 86400)
      if (interval >= 1) {
        intervalType = 'day'
      } else {
        interval = Math.floor(seconds / 3600)
        if (interval >= 1) {
          intervalType = 'hour'
        } else {
          interval = Math.floor(seconds / 60)
          if (interval >= 1) {
            intervalType = 'minute'
          } else {
            interval = seconds
            intervalType = 'second'
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's'
  }

  return interval + ' ' + intervalType
}

export const renderHourMinute = (number: number) => {
  if (number < 10) return `0${number}`
  return number
}

export const renderHour = (startTime: { hour: number; minute: number; nano: number; second: number }) => {
  const tag = startTime.hour > 12 ? 'pm' : 'am'
  return `${renderHourMinute(startTime.hour > 12 ? startTime.hour - 12 : startTime.hour)}:${renderHourMinute(startTime.minute)} ${tag}`
}

export const numberWithCommas = (x:any) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

