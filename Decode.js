export const RawDecode = State => text => {

  const { charMap, words, minCharCode } = State
  const splits = text.split("")
  const decoded = []
  let ret = ""

  splits.forEach( item => {
    let code = item.charCodeAt(0) - minCharCode 
    ret += words[ code ] || item
  })

  return ret

}

export default (State, _e) => e => {
  const rawDecode = RawDecode( State )
  const decodedText = rawDecode( e.target.innerText )
  _e.innerText = decodedText
}