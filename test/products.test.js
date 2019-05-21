const request = require('supertest')
const Product = require('../models/products')
const app = require('../app')

const products = [
  {
    tariffName: 'basic electricity tariff',
    annualCosts: 830,
    type: 'A'
  },
  {
    tariffName: 'basic electricity tariff',
    annualCosts: 1050,
    type: 'A'
  },
  {
    tariffName: 'basic electricity tariff',
    annualCosts: 1380,
    type: 'A'
  },
  {
    tariffName: 'packaged tariff',
    annualCosts: 800,
    type: 'B'
  },
  {
    tariffName: 'packaged tariff',
    annualCosts: 950,
    type: 'B'
  },
  {
    tariffName: 'packaged tariff',
    annualCosts: 1400,
    type: 'B'
  }
]

beforeEach ( async () => {
  await Product.deleteMany()
  products.map(async (product) => {
    await new Product(product).save()
  })
})

test('should return 404 error if the product with the right annual cost is not present in the database based on the input consumption', async () => {
  const response = await request(app)
    .get('/products/3000')
    .expect(404)

  expect(response.body).toEqual(
    {
      error: 'Product of type A with an annual cost of 720 not present in the database'
    }
  )
})

test('should return the comparison of the product based on the consumption', async () => {
  const response = await request(app)
    .get('/products/3500')
    .expect(200)

  expect(response.body).toEqual({
    "productA": [
      {
        "annualCosts": 830,
        "_id": expect.any(String),
        "tariffName": "basic electricity tariff",
        "type": "A",
        "__v": 0
      }
    ],
    "productB": [
      {
        "annualCosts": 800,
        "_id": expect.any(String),
        "tariffName": "packaged tariff",
        "type": "B",
        "__v": 0
      }
    ]
  })
})
