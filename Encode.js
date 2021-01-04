import { RawDecode } from './Decode.js'

const RawEncode = State => text => {

  const { charMap, minCharCode } = State
  const splits = text.split(" ")
  const encode = []

  splits.forEach( originalWord => {

    let word = originalWord + " "
    let length = word.length
    let index
    let code

    theLoop:
    while (length) {
      if (index = charMap[ " " + word.substr(0, length)]) {

        code = index + minCharCode

        if (length !== word.length) {
          index = charMap[ " " + word.substr(0, length) ]
          code = index + minCharCode
          encode.push(code)
        } else {
          encode.push(code)
        }

        if (length !== word.length) {
          word = word.substr(length)
          length = word.length
          continue theLoop
        } else {
          break
        }

      }
      // try this for codes not set
      if (length === 1)
        encode.push( word.charCodeAt(0) )

      length--
    }

  })

  const str = String.fromCodePoint.apply(self, encode)

  return str

}

export default (State, _e, _d) => e => {
  const rawEncode = RawEncode( State )
  const encodedText = rawEncode( e.target.innerText )
  _e.innerText = encodedText

  const decodedText = RawDecode(State)( encodedText )
  _d.innerText = decodedText

}