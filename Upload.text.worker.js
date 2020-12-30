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

  const mapOfWords = {}
  const charMap = {}
  const words = `~!@#$%^&*()_+=-,.<>/?":;' `.split("")
  const text = data
  const split = text.split(/\s/)
  const uniqueAddToArray = UniqueAddToArray({ mapOfWords, words })

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

  // This is the initial scramble, it will be possible to add a second file to scrambe further, or multiply the scamble
  ScrambleByArrayOfWords({ mapOfWords, charMap, words })( split )

  this.postMessage({ mapOfWords, charMap, words })

}