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

  State.fileInfo = {
    lastModified
    , lastModifiedDate
    , name
    , size
    , type
  }

  if (window.localStorage)
    localStorage.setItem( "fileInfo", JSON.stringify( State.fileInfo ))

  reader.onloadend = onloadend
  reader.readAsText(fileSource)

}