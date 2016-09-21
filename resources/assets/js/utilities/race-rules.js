export default {
  one: [ 20, 18, 16, 14, 12, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ],

  two: [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ],

  getDriversByPoints (data) {
    let records = JSON.parse(JSON.stringify(data))
    let driversOneA = records.data.filter(record => record.raceOneGroup === 'A').length
    let driversTwoA = records.data.filter(record => record.raceTwoGroup === 'A').length

    return records.data.map(record => {
      record.raceOne = record.raceOne ? record.raceOne : 99
      record.raceTwo = record.raceTwo ? record.raceTwo : 99

      let driver = record.driver.data
      let posOne = record.raceOneGroup === 'A' ? record.raceOne : record.raceOne + driversOneA
      let posTwo = record.raceTwoGroup === 'A' ? record.raceTwo : record.raceTwo + driversTwoA

      driver.one = this.one.length >= posOne ? this.one[posOne - 1] : 0
      driver.two = this.two.length >= posTwo ? this.two[posTwo - 1] : 0
      driver.total = driver.one + driver.two

      return driver
    }).sort((a, b) => {
      if (a.total === b.total) {
        return a.one < b.one ? 1 : -1
      }
      return a.total < b.total ? 1 : -1
    })
  }
}
