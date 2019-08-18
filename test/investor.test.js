let { getInvestorStats, getInvestorObject }      = require('../components/Stats')
let { addOwnership, getTotalShares }      = require('../components/Ownership')
let fs                        = require('fs')
let testfile                  = fs.readFileSync('./test/test_file1.txt').toString()
var assert                    = require('assert');
const csv                     = require('csvtojson')


let json
let stats
let fredWilson
let donValentine
let AnnMiuraKo

describe('investor stats', async function() {

  before(async () => {

    json                      = await csv().fromString(testfile)
    stats                     = getInvestorStats(json)
    fredWilson                = getInvestorObject(stats, 'Fred Wilson')
    donValentine              = getInvestorObject(stats, 'Don Valentine')

  });


  it('Fred Wilson should have $13500 in cash', function() {
       assert.equal(fredWilson['cash_paid'], 13500)
    })

  it('Don\'s shares should be 3000', function() {
      assert.equal(donValentine['shares'], 3000)
  })
})

describe('ownership', async function() {

  let totalShares
  let investmentsWithOwnership

  before(async () => {

    totalShares               = getTotalShares(stats)
    investmentsWithOwnership  = addOwnership(stats, totalShares)
    donValentine              = getInvestorObject(investmentsWithOwnership, 'Don Valentine')
    AnnMiuraKo                = getInvestorObject(investmentsWithOwnership, 'Ann Miura-Ko')

  });

  it('Should be 31.58', function() {
       assert.equal(donValentine['ownership'], 31.58)
    })

  it('Should be 9500', function() {
       assert.equal(totalShares, 9500)
    })

  it('Should be 21.05', function() {
      assert.equal(AnnMiuraKo['ownership'], 21.05)
  })
})
