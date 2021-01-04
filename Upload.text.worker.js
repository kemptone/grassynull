// this is here to create every variation of the letters, every arrangement
// this is needed if the text file is shorter and not all characters and or combinations are accounted for
function *permute(a, n = a.length) {
  if (n <= 1) yield a.slice()
  else for (let i = 0; i < n; i++) {
    yield *permute(a, n - 1)
    const j = n % 2 ? 0 : i
    ;[a[n-1], a[j]] = [a[j], a[n-1]]
  }
}

const fastScatter = (arr, agitant, repeat) => {

  // total array splits
  let x = 1600
  let y = arr.length
  let z = agitant.length

  const arrOfArr = []

  while (--x)
    arrOfArr.push([])

  while (--y) {
    let agZ = agitant[ --z ]
    let code = agZ.charCodeAt(0)
    let agArr = arrOfArr[ code ] || arrOfArr[ 0 ]
    agArr.push( arr[ y ] )
  }

  const ret = [].concat( ...arrOfArr )

  if (repeat)
    return fastScatter( ret, agitant, repeat - 1 )

  return ret

}

// this is here to create every variation of the letters, every arrangement
// this is needed if the text file is shorter and not all characters and or combinations are accounted for
function buildPermute (word) {
  return (Array.from(permute(word.split(''))).map(perm => perm.join('')))
}

// make sure to add only unique characters to the words array
const UniqueAddToArray = ({ mapOfWords, words }) => (item, success) => {

  if (!item || mapOfWords[ " " + item ])
    return

  mapOfWords[ " " + item ] = item
  words.push( item )
  words.push( item + " " )

  success && success( item )

}


const ScrambleByWord = words => word => {

  word.split("").forEach( letter => {
    const index = words.length - letter.charCodeAt( 0 )
    const word = words.splice( index, 1 )
    words.unshift( word[0] )
  })

}

const ScrambleByArrayOfWords = State => {

  return arrayOfWords => {

    const { words, charMap } = State
    const scrambleByWord = ScrambleByWord( words )
    console.log( "Total Words : " + arrayOfWords.length )

    // actual work done here
    arrayOfWords.forEach( scrambleByWord )

    words.forEach(( key, index ) =>  charMap[ " " + key ] = index )

    console.log("Finished scramble")

  }



}

onmessage = ({ data }) => {

  const { text, fileInfo } = data


  let words = `~!@#$%^&*()_+=-,.<>/?":;' `.split("")

  const mapOfWords = {}
  const charMap = {}
  // const text = data
  const split = text.split(/\s/)
  const uniqueAddToArray = UniqueAddToArray({ mapOfWords, words })
  const self = this

  split.forEach( item => {

    uniqueAddToArray( item, () => {

      if (item && item.length < 5) {
        let addTheseAlso = buildPermute( item )
        addTheseAlso.push( ...item.split("") )
        addTheseAlso.forEach( item => uniqueAddToArray(item) )
      }

    })
    
  })

  console.log("created all unique words")

  // quick add for special characters
  ;(function (start, end) {
    while (start <= end)
      words.push( String.fromCodePoint( start++ ) )
  }( 8192, 8303 ))

  // This is the initial scramble, it will be possible to add a second file to scrambe further, or multiply the scamble
  // ScrambleByArrayOfWords({ mapOfWords, charMap, words })( split )
  words = fastScatter( words, split.join(""), 10 )



  words.forEach( (key, index) => charMap[ " " + key ] = index )

  const DB = indexedDB.open("grassyNull", 2)

  DB.onsuccess = event => {

    const db = event.target.result

    const transaction = db.transaction(["settings", "banks"], "readwrite")
    const settings = transaction.objectStore("settings")
    const banks = transaction.objectStore("banks")
    const encodingName = fileInfo.name ||  "custom"

    settings.get("current_bank").onsuccess = e => {
      const { value } = e.target.result
      banks.add({
        bank : value
        , charMap
        , words
        , encodingName
      })

      self.postMessage({ charMap, words, encodingName })

    }
    
  }

}