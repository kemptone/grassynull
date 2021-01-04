export const RawDecode = State => text => {

  const { words, minCharCode } = State

  let ret = ""

  for (let item of text) {
    let code = item.codePointAt(0) - minCharCode 
    ret += words[ code ] || item
  }

  return ret

}

export default (State, _e) => e => {
  const rawDecode = RawDecode( State )
  const decodedText = rawDecode( e.target.innerText )
  _e.innerText = decodedText
}