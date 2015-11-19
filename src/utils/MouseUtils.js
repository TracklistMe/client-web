export function offsetLeft(element) {
  let xOffset = element.offsetLeft;
  let currentElement = element;
  while (currentElement.offsetParent) {
    xOffset += currentElement.offsetParent.offsetLeft;
    currentElement = currentElement.offsetParent;
  }
  return xOffset;
}
