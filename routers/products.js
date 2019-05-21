const express = require('express')
const Products = require('../models/products')
const router = new express.Router()

router.get('/products/:consumption', async (req, res) => {
  const consumption = req.params.consumption

  if(!consumption) {
    return res.status(404).send({ error: `consumption is required as a parameter which is a number`})
  }

  try {
    const annualCostProductA = (5*12) + (consumption * .22)
    const annualCostProductB = (consumption > 4000) ? (800 + (consumption - 4000)*.30) : 800

    const productA = await Products.find({
      'type': 'A',
      'annualCosts': annualCostProductA
    })
    const productB = await Products.find({
      'type': 'B',
      'annualCosts': annualCostProductB
    })

    if (!(productA.length > 0)) {
      return res.status(404).send({ error: `Product of type A with an annual cost of ${annualCostProductA} not present in the database` })
    }

    if (!(productB.length > 0)) {
      return res.status(404).send({ error: `Product of type B with an annual cost of ${annualCostProductB} not present in the database` })
    }

    res.send({
      productA,
      productB
    })
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
