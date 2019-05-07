export default {
  secret: process.env.APP_SECRET,
  maxFailedAttempts: 5,
  getTokenLifeTime() {
    return this.get('app').isProduction() ? '20m' : '7d'
  },
}
