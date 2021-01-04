import State from './State.js'

export default (start, end) => (e, fileInfo) => {

  start && start()

  console.log("uploading")

  const worker = new Worker("Upload.text.worker.js")

  worker.onmessage = ({ data }) => {
    const { words, charMap, encodingName } = data
    State.words = words
    State.charMap = charMap
    State.encodingName = encodingName
    end && end()
  }

  worker.postMessage({ text : e.target.result, fileInfo })

}