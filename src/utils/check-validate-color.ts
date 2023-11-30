export const validateHTMLColorHex = (color: string) => {
  if (color) {
    const regex = /^#([\da-f]{3}){1,2}$|^#([\da-f]{4}){1,2}$/i
    return color && regex.test(color)
  }
  return false
}
