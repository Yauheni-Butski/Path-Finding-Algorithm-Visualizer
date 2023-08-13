/*
A function that returns a grid which is a two dimensional array of objects representing the cells.
- x and y represent the coordinates of the cell.
- isstarting is a Boolean that's only true for the starting cell.
- istarget is similar, but for the target node.
- iswall is a Boolean that's only true for walls.
- And weight is for weighting nodes for weighted graph algorithms. This will help us identify features like streets with high traffic
All normal cells have a weight of 1, and the weighted cells have a weight of 5.
*/
export function getGrid(width, height) {
  let grid = [];

  for (let i = 0; i < height; i++) {
    let column = [];

    for (let j = 0; j < width; j++) {
      column.push({
        x: j,
        y: i,
        isStart: false,
        isTarget: false,
        weight: 1,
        isWall: false,
      });
    }

    grid.push(column);
  }

  //set isstart in the middle
  grid[Math.floor(height / 2)][Math.floor(width / 2)].isStart = true;
  //set end as right-bottom cell with 2x2 padding
  grid[height - 2][width - 2].isTarget = true;

  return grid;
}
