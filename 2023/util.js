function defaultSymbolMap(chunk) {
	return chunk.reduce((a, c) => a + c, 0) / chunk.length;
}

/**
 * @callback symbolMap
 * @param {*[]} chunk
 * @returns {string}
 */

/**
 * @param {*[][]} grid
 * @param {symbolMap} symbolMap
 * @param {number} scale
 */
function printGrid(grid, symbolMap = defaultSymbolMap, scale = 1) {
	let width = grid[0].length;
	let height = grid.length;
	let rowDivs = Math.ceil(height / scale);
	let colDivs = Math.ceil(width / scale);
	let chunkWidth = Math.ceil(width / colDivs);
	let chunkHeight = Math.ceil(height / rowDivs);
	let chunkedGrid = [];
	for (let i = 0; i < rowDivs; i++) {
		let chunkedRow = [];
		for (let j = 0; j < colDivs; j++) {
			chunkedRow.push(
				symbolMap(
					grid
						.slice(i * chunkHeight, (i + 1) * chunkHeight)
						.map((row) => row.slice(j * chunkWidth, (j + 1) * chunkWidth))
						.flat()
				)
			);
		}
		chunkedGrid.push(chunkedRow);
	}
	// console.log(chunkedGrid);
	process.stdout.write("\x1b[0;0H");
	chunkedGrid.forEach((row) => {
		console.log(row.join(" "));
	});
}

let input = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`
	.split("\n")
	.map((row) => row.split("").map((n) => Number(n)));

// console.log(input);
