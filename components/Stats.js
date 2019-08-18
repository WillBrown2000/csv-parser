
// takes an array of investments objects containing user data, and a target investor and returns
// the object with the target investor as a value
//

let getInvestorObject = (array, investor) => {

  for (let item of array) {
    if (item['investor'] === investor) {
      return item
    }
  }

}

// takes an array of investments objects containing user data and returns an array
// aggregated data array of objects in the format:
//    {
//      investor: <string>
//      shares: <number> total shares owned
//      cash_paid: <number> total cash paid to date
//    }
//
const getInvestorStats = (investments) => {


  let accumulator = []
  let investorCache = new Set()

  for (let item of investments) {

      let currentInvestment

      if (investorCache.has(item['INVESTOR'])) {

        currentInvestment   = getInvestorObject(accumulator, item['INVESTOR'])
        let currentTotalShares   = currentInvestment['shares']
        let currentTotalCash     = currentInvestment['cash_paid']
        let newCash              = parseInt(item['CASH PAID'], 10)
        let newShares            = parseInt(item['SHARES PURCHASED'], 10)

        // console.log('currentTotalCash', currentTotalCash, 'currentTotalShares', currentTotalShares, '\n')
        currentInvestment['cash_paid']  = currentTotalCash + newCash
        currentInvestment['shares']     = currentTotalShares + newShares

      } else {

        currentInvestment = {
          investor: item['INVESTOR'],
          shares: parseInt(item['SHARES PURCHASED'], 10),
          cash_paid: parseInt(item['CASH PAID'], 10)

        }

        accumulator.push(currentInvestment)
        investorCache.add(item['INVESTOR'])
      }

  }

  return accumulator
}


module.exports = { getInvestorStats:  getInvestorStats,
                   getInvestorObject: getInvestorObject
                 }
