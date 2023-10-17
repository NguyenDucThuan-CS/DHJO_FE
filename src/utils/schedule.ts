export const getTime = (ele: any) => {
  const startTimeHour = ele.startTime.split(':')[0]
  const startTimeMinute = ele.startTime.split(':')[1]
  const endTimeHour = ele.endTime.split(':')[0]
  const endTimeMinute = ele.endTime.split(':')[1]
  return {
    startTimeHour,
    startTimeMinute,
    endTimeHour,
    endTimeMinute
  }
}

export const collision = (queue: any, e: any) => {
  if (queue.length === 0) return 0
  let count = 0
  const startTimeHour = e.startTime.split(':')[0]

  queue.forEach((ele: any) => {
    const endTimeHour = ele.endTime.split(':')[0]
    if (Number(startTimeHour) < Number(endTimeHour)) {
      count += 1
    }
  })
  return count
}

const isColliding = (startTime: any, endTime: any, startTimeMin: any) => {
  const endTimeHour = endTime.split(':')[0]
  const endTimeMin = endTime.split(':')[1]
  if (Number(startTime) > Number(endTimeHour)) {
    return true
  } else if (Number(startTime) === Number(endTimeHour)) {
    if (Number(startTimeMin) > Number(endTimeMin)) {
      return true
    }
    return true
  }
}

export const collision2 = (queue: any, e: any) => {
  if (queue.length === 0) return 0
  const startTimeHour = e.startTime.split(':')[0]
  const startTimeMin = e.startTime.split(':')[1]
  while (queue.length > 0 && isColliding(startTimeHour, queue[0].endTime, startTimeMin)) {
    queue.shift()
  }
  return queue.length
}

export const sortIt = (data: any) => {
  return data.sort((a: any, b: any) => {
    const timea = a.startTime.split(':')[0]
    const timeb = b.startTime.split(':')[0]
    return Number(timea) - Number(timeb)
  })
}
