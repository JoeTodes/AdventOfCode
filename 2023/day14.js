function calculateLoad(input) {
	let platform = input.split("\n").map((line) => line.split(""));
	let totalLoad = 0;
	let cache = [];
	let spins = 1000000000;

	cache.push(stringify(platform));

	for (let i = 0; i < spins; i++) {
		printGrid(platform);
		platform = rotateGrid(
			rotateGrid(
				rotateGrid(
					rotateGrid(
						rotateGrid(unrotateGrid(platform).map((line) => shift(line))).map((line) =>
							shift(line)
						)
					).map((line) => shift(line))
				).map((line) => shift(line))
			)
		);
		// console.log(
		// 	JSON.stringify(
		// 		platform.map((line) => line.join(" ")),
		// 		null,
		// 		2
		// 	)
		// );
		let str = stringify(platform);
		if (cache.includes(str)) {
			console.log(`iteration ${i + 1} match found at `, cache.indexOf(str) + 1);
			let loopLength = i + 1 - cache.indexOf(str);
			let remaining = spins - i - 1;
			let loopIndex = remaining % loopLength;
			for (let j = 0; j < loopIndex; j++) {
				platform = rotateGrid(
					rotateGrid(
						rotateGrid(
							rotateGrid(
								rotateGrid(unrotateGrid(platform).map((line) => shift(line))).map(
									(line) => shift(line)
								)
							).map((line) => shift(line))
						).map((line) => shift(line))
					)
				);
			}
			break;
		} else {
			cache.push(stringify(platform));
		}
	}

	// console.log(
	// 	JSON.stringify(
	// 		platform.map((line) => line.join(" ")),
	// 		null,
	// 		2
	// 	)
	// );

	for (let row = 0; row < platform.length; row++) {
		let count = platform[row].filter((cell) => cell === "O").length;
		totalLoad += count * (platform.length - row);
	}

	return totalLoad;
}

function stringify(platform) {
	let str = "";
	for (let row = 0; row < platform.length; row++) {
		str += platform[row].join("");
	}
	return str;
}

function shift(line) {
	let firstEmpty = line.indexOf(".");
	if (firstEmpty === -1) {
		return line;
	}
	for (let i = firstEmpty + 1; i < line.length; i++) {
		if (line[i] === "O") {
			line[i] = ".";
			line[firstEmpty] = "O";
			firstEmpty++;
		} else if (line[i] === "#") {
			firstEmpty = i + 1;
		}
	}
	return line;
}

function rotateGrid(grid) {
	// rotate 90 degrees clockwise
	let rotated = [];
	for (let col = 0; col < grid[0].length; col++) {
		let row = [];
		for (let r = grid.length - 1; r >= 0; r--) {
			row.push(grid[r][col]);
		}
		rotated.push(row);
	}
	return rotated;
}

function unrotateGrid(grid) {
	// rotate 90 degrees counterclockwise
	let rotated = [];
	for (let col = grid[0].length - 1; col >= 0; col--) {
		let row = [];
		for (let r = 0; r < grid.length; r++) {
			row.push(grid[r][col]);
		}
		rotated.push(row);
	}
	return rotated;
}

let input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

let full = `...O..O.O.O.#.OO....#..O.O#.#O...#.OO.##.#...O#...#.##........##.#O#..#......#.OO......#.....O.#..O.
..OO...O.##.#...O.....OO#.O..O......O#...........#.O.#..#.###O....O..........#...O..#..#....O..#OO.O
.#OO.......#.#....O..O.#......#...#O......#...O.OO..........O..O.#.O.OO.O#OO.O....#..O#..O..O.....#.
OO..O#..OO.....#..OO..#..OOO#..O......O.##..O#....OOO.##........O.#.O....#..O.O...#....#..O#..#.O.##
#O.O.....O.#.#.#.#.#......O#..O..O.#...O..O.O.O...O.O.O.OOO.....O...O..O...###O.OOO...#..OO..O#O#...
.......O...OO.O.O.OO.OO..O....#O...O.#O........##.O...#....#O...#.....O..OO.O.##...O#####.OO.O....#.
##.....O#...O..O....OO....OO#.O....O.#..O.#.O.....OO......OO...OO#....#.........#.....#..O.O....O...
O#.#.OO........O....#.O...O.##..###.#.O.#......#.....O.....O#...#.#O..O....O##O#..O..O#.#..#.....O..
O..O#....#...O#......OO.#...#OOOO...O..O...O###O.O###.....#....#O#O#OOO....O.#....OO..O....O...##.O.
.......O#O..........#...OOO..OO##..O...O#...#O.O..O..O...#O.....O#O.#........OO.#OO....#O.O.#.O...O#
.#.#.....O.#.O.#.##..#O.....#O.##O....O#O.O#.....#...O..##O............O.O#.#....O....O.O.........O.
....O#..O#.#.O.........OO..O#O..#.....#.#..O..O....#.#...OO......#...#..#..O##O..O.#...........O#..#
...O..........O..#O#..OO#.#...OO.O.O#.O.OO..#........#..OO..O.OO.....#.#O....O.O#O.OO.#...O.#O...O..
..O..OO..#O..O#..O..O#.#..OO...O.O...#.O..O.......O...OOO.........OO..O......#..#..O...O..O##.#OO...
........OO.O.O...O..##...O##...O..O..O.OO..O.#.#.....#.O.O.O.....O.##...O#O..#......##.#...O.O...O..
OO#..............#...O.......#.O.....O..##.......O.O##....#O..#.O...#O#.O.##.O#....#...O..O..#....O.
..#.O...#.....O...O..#.##O..O....O.O.....O..O........O...#O...#..O...O....O..O....#.O..O.O......#...
...OO.O...#..#...O.OO#......O..O.O.#..#..........###..#.#.......#.O..#.O......OO.#.O#..O..O.O..#..O.
...#.......O##O..#O...#.#.#..#..#...#.....OOO#.O#O#.....O......OO....#.#.OO....O.O.##O..O....O#O.#.O
##O#.OO.O#....O.#..O..O..##...O..#O.O...........#O.##....#...O....#OO.OO....O....#OO#O.......O......
#O..#.....O....O.O#O..O.O.O....O.O#.OOO...#.#.O.OOO#.O#....#.OO#.###.....#...O#O.#.....OO..O.....O.O
##..#....#.O.#.#...OO.O.....#.#.#.###......##.....O....#...O##OO.O.OO.OO##.O.......#..O##.....OOO.#O
......O.#..OO..O......#OO....O..O...O....O.....OO......##.#.OO....O.....O..O..O.#.#..#..OO#.O..OO...
....##...O.O.O.O.O..O..#O..#........#.O..O...#.O.....###.O..O.#..O......O##....O.....O.#.....#....OO
#....#..........#.......O.O#.........#.#..O......O..O#.O..O.##.##..O..#OO.O#...............O#.#O....
..##..O#O.#......O#..#....#.O...O...O.O.O#....##.#...O..O#......#.O#.#.......O#O...#.##..#..OO..O...
...O.#..O.....OO##.....OO.#......O.OO..#.O##.#....O#.O.#....#..O#.O.#...#........#.#.#O..O...#O..#..
...##..........O#.#......O.......OOO...O..............O.O##........#........O.....O....#O#.#.....#O.
.#......O...O..#...#..#.O#.....O..OO#O...O.....##.#.#......OO..O##......#...O.O....O..##...O....#O..
..#O.O...#..O..OO.#..OO...##...#..O#O....O...O.....#O#..#.O.......O........#OO..O....#.#O.........#O
.#.....O.##...#....O..O..#.O.#.#OO...#........#..O.#.#....#.O..O.#O.#..#.......#..............##.O.#
...O..#...#.O....O.O#.#...#.#...........O.O..#.#..O.......#O.OOO.#.....#.O.#...#O....#O.O.......##..
.#....OOOO..O.....O.OO#O..#...#.....O....O...#..##.O..O.#..O..#.O#..O.O...O#.....OO........O..OO#..O
O.#.O.#...#O...#O.#......#O...O.#.O.O#O#..#.........##.O.OO..#....OOO##...O##.##.#.O...#.O.#O#......
O..##..O...O#OO#O..O..O...###..OOO...#O#......##..O.........O#.....O..#...#O......#.#..O....O......O
........#O#..##O....OO..#..#.#...#.#.#...OO...O###.#O.#OO.#..#.O.......O..O..O..OO...O....O..#...#..
.....O...O....#.#.O#...O..O.#.#O.OO#OO.O.#.....#.#..#..O.#O....##......O##O##.O#..O.###....O#O.O.#..
..##....#.O.#.#O#.O..O....OO#O..O....#....#.O.O.#...#OO....#O.#..#O.......O.O.O.#.....#O..O.O......#
.O..#..........#..O.#..#.#..O..O.O#..#..O..#.....O#..#..#OO...O#.O..OOO.....O..O..OOO..#..O..#....O.
.....O..#.#..#......OO...#..O.#..##....#O..O.O.O..O.#..OOO..O.OO......###..#..O#.OO####..#..OO.#....
#.#...O.....O....#O..#..##.O.#...O.#.##.OO...#..#O.O...#.....#...O.O.O...O.#.#..#..O.....O..OO.O..OO
..#O..O.O...O##O.O..#..O.##O##..O.OOO#O...O....#.O#............OO.#.O..#...........O......O.#..##...
.....O.O...#O.O...O#....#..#...O.#..OOO.O.OO.O##..#...#..O#O#..O..##...#....OO........#..O.O.#...#O#
O#..O....O.#...#...#...O#.#..OO#.#..O...O.OO....O...#.#O.###.#...##..OO..##....O.OO...OOO.O.#.......
O.O.#.........#####..O..#.OO..O.OOO...#O#..O.............OOO...O.....#..OO...O......#O....OO...OO.O.
#.O#...O##.O.#.........#.#.#..O......#.#....O...OOO.O...#....#.O#....O.....O.....#.O..#..#.#O.......
#..O......#.......O#O.OO#......#...#.....O#..O.O.#.....O..#.#.....##...#...O...#.#.O..O.O.....O...#.
.OOO.O...#O.#..O#O...#..#O#..#.......###...#.#......#O###.....#...#....###O#.O....##O...#.#...O..#..
.O...OO.......O.O#O#.O.#O.O...O....OO#.....#..#.....O....OO.#......O#OO...O##.#..#.#..O..O...#...#..
...O....O..O#O....#.........###..O.....O...O#....O#.....#.#.....#.O.#.OO..#.O###.....#O#...#.OO#....
#.#.....O#O....O......O#..##OO......O#..#O.O#..#...O.O##OO#.......O...#...OO.....#.O.....O#O#.....#.
..OO##.#..OO#O.......O.O..OO#..O....O#.O.O.#.#..#........O.....#...........#O.......O.#.#.......#.O.
.##O.....O....#...O..O.OOO.O.OO..#.#..O.........#...##..#..O#....#..O..#O....O......#O..O#..#O..#O..
#O.......O#......O.......O.O.#.......OO....#.....#O.#......O#OO...O.....O......O...#..O........#.OO.
O....#...OO.O..O......#O.O...#.OOO.OO....#....O.O#..O#..#...O.O...O..#O....#O...O..OO........#O.O.#O
#O#..O.........#......#OO..O#.OO#O##..#.O...O#.....#..#O#..OO.#.O#....O.O..##O#O..#O......#.O.OO.O.O
...##.....#..........#..O.O#....#..O...O......##.O.....#.OO#..OO...O..#..#O#..#.O.#..O#O..#......#..
#OO.O##..##O...#..O.O#OO#OO....##.#...O.#.#.#.#O#....O.......O.....#..#.O.#.#...........#........O..
#....O..#O#O............O#O..O.......O#.O.O##..###.#.O#O.#O....O............O..O....#.....O.OOOO....
.OO.OO..#O....#O....O.O..OOO..#..O..OO.....O...#.O.#.O.O.............O..#.O....O##..OO#.O.O.#O..O.#O
.....O......O...#.#....#.....OO...O....#O...#.#.O..##......O...O#.....O.O...#.......................
O..........#O...O#.OO..O.O.#.......#...............#....O...#.O.O..#..O....O....#...#O#.O....O.#....
#..O....O...O#..#OO.O....OO.#..O.O.O.O......O.O.....O....#..O#..O.OO....#..#.#...#......#...O#..O.OO
.......#..O....O.O........#O#OO.#O.O.OO....#..O.....O.#....O...#O.#.O.O.O....##..OO.#O..O#.......#.O
....O....O.O.##O..O..OO####O....O..O.........O.#...OO...#..#..#...#......#......O..#...O.....##...O.
.#OO#..O..O...O.OO....O.O....OO#..#O.O....O..OOO..##..................O....#....O..O...O......#.OO.O
.#.........O#.O#...#...O##.....O.OO.O.##O...O.#.##...OO.....##....#..O.OO#..O....#.#...O...O..OO....
.#.O...OO.OO.O.O#...#.#O.........#O..OO#O#.#.......#..O##....O#..#...#O......O.......O.....#..O..#..
.##..OO....O.....#O.....O..#..#O#..#......#..O.........O.........O#O..........#OOOO.......#.###.#.#O
.O..O..O...OO...OO......O.O..O.#O...#O#.O#..O#......#.O#O.......#..O##.O.O....OO#.O......##OO#.#...O
..#.O..#......#..#O.OO..O...#....O.##......#....O.O.O.....O.#...##....##....OO.O#.....O....O..#....#
O..#.OOO......O.O.OO...O......O.#.#OO.#.....##....#.##..O.....#.....O....#...OO....O#.#.#.........#.
.O......#O.......O..#.##...#.#.O....O.##..O#.OO.O.O#.#O#..##..O..##.O#O.O...#.OO.#.O..#.O.#.O.#.#O.O
.O..O.O..O.O...............OO...O.O.#..#...#.....#..O#.O.OO#.O......##O...O.....O.O.#.#..O..O.O.O.#.
O.........#...O#.O....O...O......#O..##..#O.O.#O..O..OO...#..#.#.#O.........O..OO..O.O.O#.O......#..
OO...........#.....O.O.#.#...O..#.#.#O.#.O#...#O.....O.OO.O..##.....##OO.........O...#OO#O...O....O.
.#.......O.#OO.#OO.O#.OOO...#..##.OO..O...OO.......O.#..OO.O.O..#...O...O.....O.##OOO#..O.....O.O.#O
O#.O.O.OO...#..O.....O#......#..O#OOO.OO#..O...O...O.#..O..#.O..#O.OO##...##.#.#O.#O.O.....##O..O#.#
O.#.#........#...O...#...O.O.O.#.O.....O.......#....#O..OO.#.......#.O...#.O.#..#...#O.###...#.....O
........OOO...O.OO.##O.O..#.O...O..#.......#OO#OO..O##O.......##.........O...OO.......#...#..O#O.#O#
..O#OOO.O#..##........O.......O.....#.O....OOO..O......#.......OO.......#..#.#.#.#....O#...#.O.....#
....O....#..#..O.O.O.O..O........O#....#..#.O..#OO.....OOOO....O#.O......#O..OOO#.O..#....#...O...OO
O#...O#......O...#..#......#.........O.#........#.O#.#...###.#O.O....#O.....#...#.##....O..##...OO..
....O....O........##.O.....#....O.....#..#........#OO.O.#OOO....#..#.#...###......O.O..#....OO......
.O#O....#OO#OOO.#.....O.O......##....#..OO.OOO.O##..#O.#.#...#.#....O..O#...O..OO.#.O...O..##...#...
.O#OO#..O.#OO.......##O#O.#.O..#.O#OO.OO.O.#.O#........#...O.#.O.O##O.........OO..O...O.O.O.....O#..
..##....###.O#.....O....OOO.O.....OO...O....OOOO.#........#.....#.#..O.#.....#...OOO.....OOO..#.O..#
.OO##.#.#....O..#..#.#..O.#..O.OO....O.O..O.OO.O.O.....#..#.............OOOO.O....O.O.O.#..#.......O
#.O.#.O#O.O.O.O.#.#......O#O..OO..O.....#....O..#..#O.............#....#OO....O##...#..O....O...#..O
....#...##...#...#....#.O.O#....#O.O.##.#.O...O#...O#....#.......O.#.#.....O....#.#O.O..O...O..O..#.
.O.##.#...O#OO.....O.........#O.O.O#..........OO.O...#..#.OO....O..#..#...O...OO......O##O.....O#O..
O#...........O....#O...O...O#..#.....#OO...OO..OO#OO..O.#.O#.OOO...O.....O..O...O...O.#O#.#O.....O..
O.OO.O.OOO.O##.#..OO....#....#O.#...O...OO..OO..O#O.....#...O...O...........O....#.O....O.O..#O#..##
#..#......O..OO#.......O..#......#O##....O...O.#.O#.#.O..#.#O..O..O#..O.O.#.OOO...OOO.#.#O.#....#.#.
O##..O......#OOO.#..O.O#.#...O...#...O...#O..OO..#.##O.......#O.#..#...#.O.....#.O.O.#..#.O.O..O...#
.#OOO.....O...#.......OOO.O.#.O.O#.#..#O.#....#O.#....#......#.O...OO..O..O..#O.##.OOO........O.O#..
...O.OO.O....#O...#...#OOO..O...#....OO....O...#..#O...#.#OO......O......O#.O#....#..#OOO.#....O.#..
..#.OOO....#.O..#.O#.#O...O.O.......#..OO.##.#.#..O..O....O#.#.....#..##.#O.......O#O##OO.O......OOO
..O.#...##O##O.O#...O.O#.#O.#...O........#.OO.O...##...O..O..##..O...O.#.....O...#O.#O#O.O......O.#O
..O.#..O.#.....O...#OO##..O.OOO...O.##O..O.O.......#.....O..O.##......O.....O#.........#.........O.#`;

console.log(calculateLoad(input));
// console.log(shift([".", ".", ".", ".", ".", ".", ".", ".", ".", "."]));
// console.log(shift([".", ".", ".", ".", ".", "O", ".", "O", ".", "."]));
// console.log(shift([".", ".", "#", ".", "O", ".", "#", "O", ".", "."]));

function defaultSymbolMap(chunk) {
	return chunk.reduce((a, c) => a + c);
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
