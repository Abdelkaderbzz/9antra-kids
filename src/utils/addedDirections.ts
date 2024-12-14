import { getDirections } from './getDirections'

export const addedDirections = (blocks: string[]) => {
  const directions = getDirections()
  let j = 0
  let withDirections = []
  for (let index = 0; index < blocks.length - 1; index++) {
    if (blocks[index]?.includes('se-image-container')) {
      withDirections.push(blocks[index])
    } else if (blocks[index]?.includes('popup-iframe-parent')) {
      withDirections.push(blocks[index])
    } else if (blocks[index]?.includes('btn-234-custom')) {
      withDirections.push(blocks[index])
    } else {
      withDirections.push(`<div style="direction:${directions[j]};">${blocks[index]}</div>`)
      j++
    }
  }
  return withDirections
}
