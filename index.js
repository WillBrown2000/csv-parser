const csv                    = require('csvtojson')
const { getInvestorStats }   = require('./components/Stats')
const { getTotalShares, addOwnership } = require('./components/Ownership')
const args                   = process.argv.slice(2)
const date                   = require('date-and-time') 

const testfile               = args[0]
const date                   = (args.length > 1 ? args[1] : null)

console.log(testfile, date)


csv().fromFile(testfile).then( (json) => {

  let investorStats = getInvestorStats(json)
  console.log(json)
  let totalShares = getTotalShares(investorStats)
  let statsWithOwnership = addOwnership(investorStats, totalShares)
  console.log(statsWithOwnership)

})
