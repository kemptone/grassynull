import $ from './helpers/dollar.js'

const State = {
  words : []
  , charMap : {}
  , minCharCode : 1500
  , maxCharCode : 1000 * 200
  , isFullScreen : false
}

if (window.localStorage) {
  let words =  JSON.parse( localStorage.getItem("words") )
  let charMap =  JSON.parse( localStorage.getItem("charMap") )
  let fileInfo = JSON.parse( localStorage.getItem("fileInfo") )
  State.words = words || []
  State.charMap = charMap || {}
  State.fileInfo = fileInfo
}

window.State = State

export default State