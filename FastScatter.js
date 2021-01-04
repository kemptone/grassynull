// agitant is a string
export default (arr, agitant) => {

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
    let agArr = arrOfArr[ code ]
    agArr.push( arr[ y ] )
  }

  const ret = [].concat( ...arrOfArr )

  return ret

}