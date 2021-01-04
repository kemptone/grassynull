import State from './State.js'

export default onloadend => e => {

  const fileSource = e.target.files[0]
  , reader = new FileReader()

  const {
    lastModified
    , lastModifiedDate
    , name
    , size
    , type
  } = fileSource

  const fileInfo = {
    lastModified
    , lastModifiedDate
    , name
    , size
    , type
  }

  reader.onloadend = e => onloadend(e, fileInfo)
  reader.readAsText(fileSource)

}