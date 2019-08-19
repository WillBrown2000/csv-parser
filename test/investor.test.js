const { getInvestorStats, getInvestorObject }      = require('../components/Stats')
const { addOwnership, getTotalShares }             = require('../components/Ownership')
const fs                                           = require('fs')
const testfile                                     = fs.readFileSync('./test/test_file1.txt').toString()
const assert                                       = require('assert');
const csv                                          = require('csvtojson')
const { dateFilter, getTotalCash }                 = require('../components/Utils')


let json
let stats
let fredWilson
let donValentine
let AnnMiuraKo
let totalShares
let investmentsWithOwnership


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

  before(async () => {

    json                      = await csv().fromString(testfile)
    stats                     = getInvestorStats(json)
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

describe('date filters', async function() {

  let totalShares
  let investmentsWithOwnership
  // let date1 = (new Date('2019-01-01')).toISOString().split('T')[0]
  let date1 = '2019-01-01'
  let date2 = '2000-01-01'
  let date3 =  (new Date()).toISOString().split('T')[0]
  let date4 = '2018-01-01'
  console.log(date1, date2,date3,date4)

  before(async () => {

    json                      = await csv().fromString(testfile)

    dateFilteredStats1        = dateFilter(date1,json)
    dateFilteredStats2        = dateFilter(date2,json)
    dateFilteredStats3        = dateFilter(date3,json)
    dateFilteredStats4        = dateFilter(date4,json)


    aggStats1                  = getInvestorStats(dateFilteredStats1)
    totalShares1               = getTotalShares(aggStats1)
    investmentsWithOwnership1  = addOwnership(aggStats1, totalShares1)
    donValentine1              = getInvestorObject(investmentsWithOwnership1, 'Don Valentine')
    AnnMiuraKo1                = getInvestorObject(investmentsWithOwnership1, 'Ann Miura-Ko')


    aggStats2                  = getInvestorStats(dateFilteredStats2)
    totalShares2               = getTotalShares(aggStats2)
    investmentsWithOwnership2  = addOwnership(aggStats2, totalShares2)
    donValentine2              = getInvestorObject(investmentsWithOwnership2, 'Don Valentine')
    AnnMiuraKo2                = getInvestorObject(investmentsWithOwnership2, 'Ann Miura-Ko')

    aggStats3                  = getInvestorStats(dateFilteredStats3)
    totalShares3               = getTotalShares(aggStats3)
    investmentsWithOwnership3  = addOwnership(aggStats3, totalShares3)
    donValentine3              = getInvestorObject(investmentsWithOwnership3, 'Don Valentine')
    AnnMiuraKo3                = getInvestorObject(investmentsWithOwnership3, 'Ann Miura-Ko')

    aggStats4                  = getInvestorStats(dateFilteredStats4)
    totalShares4               = getTotalShares(aggStats4)
    investmentsWithOwnership4  = addOwnership(aggStats4, totalShares4)
    donValentine4              = getInvestorObject(investmentsWithOwnership4, 'Don Valentine')
    AnnMiuraKo4                = getInvestorObject(investmentsWithOwnership4, 'Ann Miura-Ko')
    SandyLerner4               = getInvestorObject(investmentsWithOwnership4, 'Sandy Lerner')

  });

  describe('date: 2019-01-01', function() {

    it('Should be 50.00', function() {
         assert.equal(donValentine1['ownership'], 50.00)
      })

    it('Should be 6000', function() {
         assert.equal(totalShares1, 6000)
      })

    it('Should be 33.33', function() {
        assert.equal(AnnMiuraKo1['ownership'], 33.33)
    })
    it('Should be 102000', function() {

        assert.equal(getTotalCash(aggStats1), 102000)
    })
  })

  describe('date: 2000-01-01', function() {

    it('Should be undefined', function() {
         assert.equal(donValentine2, undefined)
      })

    it('Should be 0', function() {
         assert.equal(totalShares2, 0)
      })

    it('Should be undefined', function() {
        assert.equal(AnnMiuraKo2, undefined)
    })
    it('Should be 0', function() {

        assert.equal(getTotalCash(aggStats2), 0)
    })
  })

  describe('date: now/bad date', function() {

    it('Should be 31.58', function() {
         assert.equal(donValentine3['ownership'], 31.58)
      })

    it('Should be 9500', function() {
         assert.equal(totalShares3, 9500)
      })

    it('Should be 21.05', function() {
        assert.equal(AnnMiuraKo3['ownership'], 21.05)
    })
    it('Should be 165500', function() {

        assert.equal(getTotalCash(aggStats3), 165500)
    })
  })

  describe('date: 2018-01-01', function() {

    it('Should be 31.58', function() {
         assert.equal(donValentine4['ownership'], 50.00)
      })

    it('Should be 2000', function() {
         assert.equal(totalShares4, 2000)
      })

    it('Should be undefined', function() {
        assert.equal(AnnMiuraKo4, undefined)
    })

    it('Should be 50.00', function() {
        assert.equal(SandyLerner4['ownership'], 50.00)
    })
    it('Should be 22000', function() {

        assert.equal(getTotalCash(aggStats4), 22000)
    })
  })
})
