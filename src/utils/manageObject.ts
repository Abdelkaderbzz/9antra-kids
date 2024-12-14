export const filterObject = (obj: any) => {
  const filteredObject: any = {}
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== false && obj[key]?.length !== 0) {
      filteredObject[key] = obj[key]
    }
  }
  return filteredObject
}
export const filterFalsyAndNullValues = (obj: any) => {
  const filteredValues = []
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== false && obj[key] !== undefined && obj[key] !== '') {
      filteredValues.push(obj[key])
    }
  }
  return filteredValues.join(', ')
}
export function extractLabels(obj: any) {
  const labels: string[] = []

  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item.label) {
          labels.push(item.label)
        }
      })
    } else if (typeof value === 'boolean' && value) {
      labels.push(key)
    }
  })

  return labels.join(', ')
}
export const filterObjectDeep = (obj: any) => {
  const result: any = {}
  for (const [key, value] of Object.entries(obj)) {
    if (value != null && value !== false && !(Array.isArray(value) && value.length === 0)) {
      result[key] = Array.isArray(value) ? value.map((item: any) => item.value).join(',') : value
    }
  }
  return result
}
export const handleAudienceLabels = (audience: any) => {
  let audienceLabels: string[] = []
  audience?.map((el: any) => audienceLabels.push(el?.label))
  return audienceLabels.length < 1 ? 'Everyone' : audienceLabels.join(' | ')
}

export const handleTargetFunc = (target: any) => {
  if (typeof target === 'string') {
    return target
  } else if (typeof target === 'object' && Array.isArray(target)) {
    return handleAudienceLabels(target)
  } else {
    return 'Everyone'
  }
}
