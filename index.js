const csv                               = require('csvtojson')
const { getInvestorStats }              = require('./components/Stats')
const { getTotalShares, addOwnership }  = require('./components/Ownership')
const { dateFilter, getTotalCash }      = require('./components/Utils')
const args                              = process.argv.slice(2)
const date                              = require('date-and-time')
const testfile                          = args[0]
const rawDate                           = (args.length > 1 ? args[1] : null)

// check date format

function isValidDate(d) {
  return new Date(d) instanceof Date && !isNaN(new Date(d)) && /([0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9])/.test(d);
}

let isValid = isValidDate(rawDate)

if (!isValid) {
  console.log('Date entered does not conform to YYYY-MM-DD format.  Using current time of', (new Date()).toISOString().split('T')[0])
}

// if the date is valid, use the date entered, if it's invalid use the current date

let localDate = (isValid) ? (new Date(rawDate)).toISOString().split('T')[0]	: (new Date()).toISOString().split('T')[0]

// prep formatted date

let tempDateArray = localDate.split('-')
let year = tempDateArray.shift()
tempDateArray.push(year)
let formatedDate = tempDateArray.join('/')

csv().fromFile(testfile).then( (jsonArray) => {

  let dateFilteredStats = dateFilter(localDate,jsonArray)
  let aggregatedInvestorStats = getInvestorStats(dateFilteredStats)
  let totalShares = getTotalShares(aggregatedInvestorStats)
  let statsWithOwnership = addOwnership(aggregatedInvestorStats, totalShares)
  let totalCash = getTotalCash(aggregatedInvestorStats)

  let capTableJson = {
    date: formatedDate,
    cash_raised: totalCash,
    total_number_of_shares: totalShares,
    ownership: statsWithOwnership,
  }

  console.log(capTableJson)

})
