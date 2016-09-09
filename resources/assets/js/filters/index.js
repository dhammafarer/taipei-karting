let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function racePhoto (photo) {
  let path = '/img/races/'
  let defaultPhoto = 'race--default.jpg'

  if (!photo) return path + defaultPhoto
  return path + photo
}

export function driverPhoto (photo) {
  let path = '/img/drivers/'
  let defaultPhoto = 'driver--default.jpg'

  if (!photo) return path + defaultPhoto
  return path + photo
}

export function monthYear (value) {
  if (!value) return value
  let date = new Date(value)
  let year = new String(date.getFullYear())
  let gpDate = months[date.getMonth()] + ' ' + year

  return gpDate
}

export function monthDay (value) {
  if (!value) return value
  let date = new Date(value)
  let day = new String(date.getDate())
  date = months[date.getMonth()] + ' ' + day

  return date
}

export function tba (value) {
  if (!value) return 'TBA'

  return value
}

export function raceRecord (value) {
  if (!value || value === "0") {
    return 'n/a'
  }
  return value
}

export function searchFor (value, searchString) {
  let result = []
  if (!searchString) return value

  searchString = searchString.trim().toLowerCase()

  result = value.filter((item) => {
    if (item.name.toLowerCase().indexOf(searchString) !== -1) {
      return item;
    }
  })

  return result
}

export function byQualTime (a, b) {
  let a1 = parseInt(a.qualOne)
  let a2 = parseInt(a.qualTwo)
  let b1 = parseInt(b.qualOne)
  let b2 = parseInt(b.qualTwo)

  if (a1 && a2) {
    a = a1 > a2 ? a2 : a1
  } else {
    a = a1 ? a1 : a2
  }

  if (b1 && b2) {
    b = b1 > b2 ? b2 : b1
  } else {
    b = b1 ? b1 : b2
  }

  a = !a ? 999 : a
  b = !b ? 999 : b

  return a > b
}

export function byQualTimeReverse (a, b) {
  let a1 = parseInt(a.qualOne)
  let a2 = parseInt(a.qualTwo)
  let b1 = parseInt(b.qualOne)
  let b2 = parseInt(b.qualTwo)

  if (a1 && a2) {
    a = a1 > a2 ? a2 : a1
  } else {
    a = a1 ? a1 : a2
  }

  if (b1 && b2) {
    b = b1 > b2 ? b2 : b1
  } else {
    b = b1 ? b1 : b2
  }

  a = !a ? 999 : a
  b = !b ? 999 : b

  return a < b
}

export function raceOnePosition (a, b) {
  a = !parseInt(a.raceOne) ? 999 : a.raceOne
  b = !parseInt(b.raceOne) ? 999 : b.raceOne

  return a > b
}

export function raceTwoPosition (a, b) {
  a = !parseInt(a.raceTwo) ? 999 : a.raceTwo
  b = !parseInt(b.raceTwo) ? 999 : b.raceTwo

  return a > b
}

export function gridReady (race) {
  let raceGroup = race + 'Group'
  return this.race.records.data.some((r) => {
    if (r[raceGroup]) {
      return true
    }
    return false
  })
}

export function raceComplete (race, group) {
  return this.race.records.data.filter((r) => {
    return r[race + 'Group'] === group
  }).some((r) => {
    return r[race] > 0
  })
}
