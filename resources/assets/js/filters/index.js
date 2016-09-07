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

export function raceRecord (value) {
  if (!value || value === "0") {
    return 'n/a'
  }
  return value
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
