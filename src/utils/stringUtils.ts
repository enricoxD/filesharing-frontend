export function capitalize(word: string) {
  const first = word.charAt(0)
  const rest = word.slice(1)
  return first.toUpperCase() + rest.toLowerCase()
}