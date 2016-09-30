import R from 'ramda'

export default {
  one: [ 20, 18, 16, 14, 12, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ],

  two: [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ],

  getOneRaceClassification (race) {
    let records = JSON.parse(JSON.stringify(race.records))
    let driversOneA = records.data.filter(record => record.raceOneGroup === 'A').length
    let driversTwoA = records.data.filter(record => record.raceTwoGroup === 'A').length

    let classification = records.data.map(record => {
      record.raceOne = record.raceOne ? record.raceOne : 99
      record.raceTwo = record.raceTwo ? record.raceTwo : 99

      let driver = JSON.parse(JSON.stringify(record.driver.data))
      let posOne = record.raceOneGroup === 'A' ? record.raceOne : record.raceOne + driversOneA
      let posTwo = record.raceTwoGroup === 'A' ? record.raceTwo : record.raceTwo + driversTwoA

      driver.race = {
        name: race.name,
        date: race.date
      }
      driver.points = {}
      driver.points.one = this.one.length >= posOne ? this.one[posOne - 1] : 0
      driver.points.two = this.two.length >= posTwo ? this.two[posTwo - 1] : 0
      driver.points.total = driver.points.one + driver.points.two

      return driver
    }).sort((a, b) => {
      if (a.points.total === b.points.total) {
        return a.points.one < b.points.one ? 1 : -1
      }
      return a.points.total < b.points.total ? 1 : -1
    })

    if (race.records.data.some(r => r.raceTwo > 0)) {
      classification[0].wins = race.id
      classification.forEach((r, i) => r.standing = i + 1)
    }
    return classification
  },

  getDriversWithClassification (drivers, races) {
    let recordsWithPoints = this.getRecordsWithPoints(races)

    return JSON.parse(JSON.stringify(drivers)).map(driver => {
      let own = recordsWithPoints.filter(r => r.id === driver.id)
      if (own.length === 0) return

      driver.races = own.length
      driver.points = {
        total: own.map(r => r.points.total).reduce((a,b) => a + b),
        one: own.map(r => r.points.one).reduce((a,b) => a + b),
        two: own.map(r => r.points.two).reduce((a,b) => a + b)
      }
      driver.average = (driver.points.total / driver.races).toFixed(2)
      driver.wins = own.filter(r => r.wins > 0)
      return driver
    }).filter(d => d)
  },

  filterClassification (drivers, races) {
    return this.getDriversWithClassification(drivers, races).sort((a,b) => {
      if (a.points.total === b.points.total) {
        if (a.wins.length === b.wins.length) {
          if (a.points.one === b.points.one) {
            return a.races > b.races ? 1: -1
          } return a.points.one < b.points.one ? 1 : -1
        } else return a.wins.length < b.wins.length ? 1 : -1
      } else return a.points.total < b.points.total ? 1 : -1
    })
  },

  getDriverStanding (id, drivers, races) {
    let classification = this.filterClassification(drivers, races)
    return R.findIndex(R.propEq('id', id), classification) + 1
  },

  getDriverHistory (id, races) {
    let recordsWithPoints = this.getRecordsWithPoints(races)
    return recordsWithPoints.filter(r => r.id === id)
  },

  getRecordsWithPoints (races) {
    return races.map(race => this.getOneRaceClassification(race)).reduce((acc, curr) => acc.concat(curr))
  }
}
