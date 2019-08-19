// takes in an array of json user info and date and returns an array of all json objects that occured on or before that date

let dateFilter = (date, jsonArray) => {

  let accumulator = []

  for (let item of jsonArray) {
    let itemDate = item['#INVESTMENT DATE']
    let itemDateInMs  = new Date(itemDate).getTime()
    let dateInMs      = new Date(date).getTime()
    if (itemDateInMs <= dateInMs) {
      accumulator.push(item)
    }
  }
  return accumulator
}

let getTotalCash = (jsonArray) => {

  let total = 0

  for (let item of jsonArray) {
    total += item['cash_paid']
  }

  return total
}

module.exports = {
  dateFilter: dateFilter,
  getTotalCash: getTotalCash,
}
