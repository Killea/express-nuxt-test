const { Router } = require('express')

const router = Router()

// Mock Users
const users = [
  { name: 'Alexandre' },
  { name: 'Pooya' },
  { name: 'Sébastien' }
]
const axios = require('axios')
/* GET users listing. */
router.get('/users', async function (req, res, next) {
  const data = JSON.stringify({
    collection: 'test_collection',
    database: 'test',
    dataSource: 'Cluster0',
    projection: {
      pig: 'test'
    }
  })

  const config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-elaox/endpoint/data/beta/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'NCTWPlsj3upMrCYX4grtjYssu2dVJO2PNN3B3hZSbucrZWTnj72sPM0OR4de9qCk'
    },
    data
  }

  const result = await axios(config)
  console.log(result.data)
  res.json([{ name: result.data }])
})

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

module.exports = router
