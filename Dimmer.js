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


// This is to create the default grassyNull language file
// this is here to create every variation of the letters, every arrangement
// this is needed if the text file is shorter and not all characters and or combinations are accounted for
function buildPermute (word) {
  return (Array.from(permute(word.split(''))).map(perm => perm.join('')))
}

const AddGroup = graphs => (x, end) => {
  while (x < end) {
    graphs.push( String.fromCodePoint(x) )
    x++
  }
}

export default State => callback => {

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

  callback && callback( graphs )

}