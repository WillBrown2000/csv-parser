// takes an array of investments objects containing user data and returns an array
// aggregated data array of objects in the format:
//    {
//      investor: <string>
//      shares: <number> total shares owned
//      cash_paid: <number> total cash paid to date
//    }
//
//

const getInvestorStats = (investments) => {

  let accumulator = {}

  for (let item of investments) {

    for (let key of Object.keys(item)) {

      console.log(key, item[key])

    }

    console.log('\n')
  }

}


module.exports = getInvestorStats
