import State from './State.js'

export default (start, end) => e => {

  start && start()

  console.log("uploading")

  const worker = new Worker("Upload.text.worker.js")

  worker.onmessage = ({ data }) => {
    const { words, charMap } = data
    State.words = words
    State.charMap = charMap
    end && end()
  }

  worker.postMessage( e.target.result )

}