
// takes an array of investments objects containing user data and total shares, and returns an array
// of objects with the ownership percentage as an additional key/value pair.  This does not modify the original
// array

let addOwnership = (investorStats, totalShares) => {

    let accumulator = []
    for (let item of investorStats) {
      item['ownership'] = (item['shares']/totalShares*100).toFixed(2)
      accumulator.push(item)
    }
    return accumulator
}

// takes an array of investments objects containing user data and returns an the ownership percentage
// for the specific owner
//    {
//      investor: <string>
//      shares: <number> total shares owned
//      cash_paid: <number> total cash paid to date
//    }
//
//

let getTotalShares = (investorStats) => {

  let totalShares = 0

  for (let item of investorStats) {
    totalShares += item['shares']
  }

  return totalShares

}

module.exports = {
                   getTotalShares: getTotalShares,
                   addOwnership: addOwnership,
                  }
