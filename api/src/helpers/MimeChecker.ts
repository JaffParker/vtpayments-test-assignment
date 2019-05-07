import { Transform } from 'stream'
import { MimeNotAllowedError } from '../errors/MimeNotAllowedError'
import * as vFileType from 'file-type'

// This code is copied from a gist: https://gist.github.com/PaulMougel/7446104
// Had to replace MMMagic with another package though because it did not work

export const MimeChecker = (allowedMime: string[]): Transform => {
  const mimeChecker = new Transform()
  //@ts-ignore
  mimeChecker.data = []
  //@ts-ignore
  mimeChecker.mimeFound = false
  mimeChecker._transform = function(chunk, encoding, done) {
    const self = this

    if (self.mimeFound) {
      self.push(chunk)
      return done()
    }

    self.data.push(chunk)
    if (self.data.length < 10) {
      return done()
    } else if (self.data.length === 10) {
      const buffered = Buffer.concat(self.data)

      const { mime } = vFileType(buffered)
      if (!allowedMime.includes(mime))
        return self.emit('error', new MimeNotAllowedError())
      self.data.map(self.push.bind(self))
      console.log(self)
      self.mimeFound = self
      return done()
    }
  }

  return mimeChecker
}
