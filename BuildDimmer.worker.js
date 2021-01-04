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
  let x = 600
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


// This is to create the default grassyNull language file
// this is here to create every variation of the letters, every arrangement
// this is needed if the text file is shorter and not all characters and or combinations are accounted for
function buildPermute (word) {
  return (Array.from(permute(word.split(''))).map(perm => perm.join('')))
}

const AddGroup = graphs => (x, end) => {
  while (x < end) {
    graphs.push( String.fromCodePoint(x) )
    graphs.push( String.fromCodePoint(x) + " " )
    graphs.push( String.fromCodePoint(x) + "." )
    graphs.push( String.fromCodePoint(x) + ". " )
    graphs.push( String.fromCodePoint(x) + "," )
    graphs.push( String.fromCodePoint(x) + ", " )
    x++
  }
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

const buildList = () => {

  const graphs = []
  const map = {}
  const letters = "abcdefghijklmnopqrstuvwxyz"
  const addGroup = AddGroup( graphs )

  addGroup(34, 383)

  letters.split("").forEach( letter1 => {
  letters.split("").forEach( letter2 => {
  letters.split("").forEach( letter3 => {

    const gram = buildPermute( `${ letter1 }${ letter2 }${ letter3 }` )
    const gram2 = buildPermute( `${ letter1 }${ letter2 }` )

    gram2.forEach( word => {
      if (!map[ " " + word ]) {
        graphs.push( word )
        graphs.push( word + " "  )
        graphs.push( word + "."  )
        graphs.push( word + ". " )
        graphs.push( word + ","  )
        graphs.push( word + ", " )
        graphs.push( word.substr(0, 1).toUpperCase() + word.substr(1) )
        map[ " " + word ] = true
      }
    })

    gram.forEach( word => {
      if (!map[ " " + word ]) {
        graphs.push( word )
        graphs.push( word + ". " )
        graphs.push( word + ", " )
        graphs.push( word + " "  )
        graphs.push( word.substr(0, 1).toUpperCase() + word.substr(1) )
        map[ " " + word ] = true
      }
    })

  })
  })
  })

  return graphs

}

onmessage = () => {

  const self = this
  const charMap = {}
  let words = buildList()

  console.time("scramble")
  console.timeLog("scramble")


  const allLetters = words.join("")
  words = fastScatter( words, allLetters, 100 )
  words.forEach( (key, index) => charMap[ " " + key ] = index )

  console.timeEnd("scramble")

  const DB = indexedDB.open("grassyNull", 2)

  DB.onsuccess = event => {

    const db = event.target.result

    const transaction = db.transaction(["settings", "banks"], "readwrite")
    const settings = transaction.objectStore("settings")
    const banks = transaction.objectStore("banks")
    

    settings.get("current_bank").onsuccess = e => {
      const { value } = e.target.result

      banks.add({
        bank : value
        , charMap
        , words
        , encodingName : "Dimmer (default)"
      }).onsuccess = e => {
        self.postMessage({ charMap, words })
      }


    }
    
  }

  // self.postMessage({ charMap, words })

}