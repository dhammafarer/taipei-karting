let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

let config = {
  imgPath: '/img/',
  racesPath: '/uploads/races/',
  raceDefault: 'race--default.jpg',
  circuitsPath: '/img/circuits/',
  circuitDefault: 'circuit--default.svg',
  driversPath: '/uploads/drivers/',
  driverDefault: 'driver--default.jpg',
  flagsPath: '/img/flags/24/',
  flagDefault: '_United Nations.png',
  tbPrefix: 'tb_'
}

export function racePhoto (photo) {
  if (!photo) return config.imgPath + config.raceDefault
  return config.racesPath + photo
}

export function raceThumb (photo) {
  if (!photo) return config.imgPath + config.raceDefault
  return config.racesPath + config.tbPrefix + photo
}

export function circuitPhoto (circuit) {
  if (!circuit) return config.circuitsPath + config.circuitDefault
  return config.circuitsPath + 'Circuit--' + circuit + '.svg'
}

export function driverPhoto (photo) {
  if (!photo) return config.imgPath + config.driverDefault
  return config.driversPath + photo
}

export function driverThumb (photo) {
  if (!photo) return config.imgPath + config.driverDefault
  return config.driversPath + config.tbPrefix + photo
}

export function countryFlag (country) {
  if (!country) return config.flagsPath + config.flagDefault
  return config.flagsPath + country.toLowerCase() + '.png'
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

export function gridReady (race, group) {
  let raceGroup = race + 'Group'
  return this.race.records.data.some((r) => r[raceGroup] === group)
}

export function raceComplete (race, group) {
  return this.race.records.data.filter((r) => {
    return r[race + 'Group'] === group
  }).some((r) => {
    return r[race] > 0
  })
}
