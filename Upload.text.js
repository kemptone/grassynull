import State from './State.js'

export default (start, end) => e => {

  start && start()

  console.log("uploading")

  const worker = new Worker("Upload.text.worker.js")

  worker.onmessage = ({ data }) => {
    const { words, mapOfWords, charMap } = data
    State.words = words
    State.mapOfWords = mapOfWords
    State.charMap = charMap

    if (window.localStorage) {
      localStorage.setItem( "words", JSON.stringify( words ) )
      localStorage.setItem( "charMap", JSON.stringify( charMap ) )
      localStorage.setItem( "mapOfWords", JSON.stringify( mapOfWords ) )
    }

    end && end()
  }

  worker.postMessage( e.target.result )

}