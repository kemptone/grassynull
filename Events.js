import State from './State.js'
import $ from './helpers/dollar.js'
import Upload from './Upload.js'
import UploadText from './Upload.text.js'
import Encode from './Encode.js'
import Decode from './Decode.js'

const Events = e => {

  console.log("%c🃟𝚐𝚛𝚊𝚜𝚜𝚢𝑵𝒖𝒍𝒍", 'font-size:40pt')
  console.log("%c\n\n\nOnce thoughts become caged by walls of oppressors; when the natural limits of free and empowered human beings is stiffled, it is the duty of the able to resist and seek freedom for all. -homnibus\n\n\n", "color:#aaa")
  if (!State.words.length) {
    console.log("%cNo source text loaded, upload a source text", 'color:red')
  }

  $("#btn_upload_text").addEventListener(
    "click"
    , e => {
      $("#upload").click()
    }
  )

  $("#upload").addEventListener(
    "change"
    , Upload( UploadText( 
      () => $("body").classList.add("loading")
      , () => { 
        $("body").classList.remove("needs-source", "loading") 
        $("#encoding_name").innerText = `encoding: ${ State.encodingName }`
      }
    ) )
  )

  $("#source").addEventListener(
    "blur"
    , Encode(
        State
        , $("#encoded")
        , $("#decoded")
      )
  )

  $("#source").addEventListener(
    "keypress"
    , Encode(
        State
        , $("#encoded")
        , $("#decoded")
      )
  )

  $("#encoded").addEventListener(
    "blur"
    , Decode(
        State
        , $("#decoded")
      )
  )

  $("#btn_full_screen").addEventListener(
    "click"
    , e => {

      if (State.isFullScreen)
        $("body").classList.remove("full-screen")
      else
        $("body").classList.add("full-screen")

      State.isFullScreen = !State.isFullScreen

    }
  )

  $(".use-default button").addEventListener(
    "click"
    , e => {
      location.reload()
    }
  )

  $("#btn_clear").addEventListener(
    "click"
    , e => {
      if (confirm("Clearing will destroy the cipher, are you sure?")) {

        $("#encoding_name").innerText = ""

        const DB = indexedDB.open("grassyNull", 2)
          DB.onsuccess = event => {
            const transaction = event.target.result.transaction(["settings", "banks"], "readwrite")
            const banks = transaction.objectStore("banks")
            banks.delete( State.bank || 0 ).onsuccess = e => {
              $("body").classList.add("needs-source")
              // location.reload()
            }
          }
      }
    }
  )

  if (!State.words.length) {
    $("body").classList.add("needs-source")
  }

}

export default Events