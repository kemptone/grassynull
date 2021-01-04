import $ from './helpers/dollar.js'

const State = {
  words : []
  , charMap : {}
  , minCharCode : 1500
  , isFullScreen : false
}

const buildDefault = ({ banks, settings, current_bank }) => {

  const worker = new Worker("BuildDimmer.worker.js")

  worker.onmessage = ({ data }) => {
    const { words, charMap } = data
    State.words = words
    State.charMap = charMap
    State.encodingName = "Dimmer (default)"

    if (State.words.length)
      $("body").classList.remove("needs-source")

    if (State.encodingName)
      $("#encoding_name").innerText = "encoding: " + State.encodingName

  }

  worker.postMessage({})

}

const DB = indexedDB.open("grassyNull", 2)

DB.onsuccess = event => {

  const transaction = event.target.result.transaction(["settings", "banks"], "readwrite")
  const settings = transaction.objectStore("settings")
  const banks = transaction.objectStore("banks")

  settings.get("current_bank").onsuccess = e => {

    const { value : current_bank } = e.target.result
    const request =  banks.get( current_bank )
    
    request.onsuccess = e => {

      const bank = e.target.result

      if (bank)
        Object.assign( State, bank )
      else {
        buildDefault({ })
      }

      if (State.encodingName)
        $("#encoding_name").innerText = "encoding: " + State.encodingName

      if (State.words.length) {
        $("body").classList.remove("needs-source")
      }

    }

  }
  
}

DB.onupgradeneeded = function (event) {
  const db = event.target.result
  const settings = db.createObjectStore("settings", { keyPath : "name" })
  const banks = db.createObjectStore("banks", { keyPath : "bank" })
  settings.add({ name : "current_bank", value : 0 })
  buildDefault({})
}

window.State = State

export default State