module.exports = {
  client: {
    service: {
      name: 'vtpayments',
      url: 'http://127.0.0.1:8000/graphql',
      // optional disable SSL validation check
      skipSSLValidation: true,
    },
  },
}
