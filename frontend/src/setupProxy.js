const proxy = require('http-proxy-middleware')

module.exports = app => {
  app.use(proxy('/graphql', { target: 'http://localhost:8000' }))
  app.use(proxy('/images', { target: 'http://localhost:8000' }))
  app.use(proxy('/receipt', { target: 'http://localhost:8000' }))
}
