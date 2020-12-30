export default (path, allowEmpty) => {
  const thing = document.querySelector( path )
  return allowEmpty ? thing : thing || document.createElement("button")
}