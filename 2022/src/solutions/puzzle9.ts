import { parseInputBySymbol } from "../util";

const input = parseInputBySymbol("09.txt")
	.filter((line) => line)
	.map((line) => line.split(" "))
	.map((line) => [line[0], Number(line[1])]);

console.log(input);

// let hx = 0;
// let hy = 0;
// let lasthx = 0;
// let lasthy = 0;
// let tx = 0;
// let ty = 0;

let visited = ["0,0"];

// input.forEach((move) => {
// 	for (let i = 0; i < move[1]; i++) {
// 		switch (move[0]) {
// 			case "U":
// 				moveH(hx, hy + 1);
// 				break;
// 			case "D":
// 				moveH(hx, hy - 1);
// 				break;
// 			case "L":
// 				moveH(hx - 1, hy);
// 				break;
// 			case "R":
// 				moveH(hx + 1, hy);
// 				break;

// 			default:
// 				break;
// 		}
// 	}
// });

function isAdjacent(headx, heady, tailx, taily) {
	return Math.abs(headx - tailx) <= 1 && Math.abs(heady - taily) <= 1;
}

// function moveH(x, y) {
// 	if (!isAdjacent(x, y, tx, ty)) {
// 		tx = hx;
// 		ty = hy;
// 		if (!visited.includes(`${tx},${ty}`)) {
// 			visited.push(`${tx},${ty}`);
// 		}
// 	}
// 	hx = x;
// 	hy = y;
// }

let knots = [
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0],
];

input.forEach((move) => {
	for (let i = 0; i < move[1]; i++) {
		let head = knots[0];
		switch (move[0]) {
			case "U":
				moveKnot(0, head[0], head[1] + 1);
				break;
			case "D":
				moveKnot(0, head[0], head[1] - 1);
				break;
			case "L":
				moveKnot(0, head[0] - 1, head[1]);
				break;
			case "R":
				moveKnot(0, head[0] + 1, head[1]);
				break;

			default:
				break;
		}
	}
	console.log(knots);
});

console.log(visited);
console.log(visited.length);

function moveKnot(index, x, y) {
	let knot = knots[index];
	knot[0] = x;
	knot[1] = y;
	if (index < knots.length) {
		if (index != knots.length - 1) {
			let nextKnot = knots[index + 1];
			if (!isAdjacent(x, y, nextKnot[0], nextKnot[1])) {
				if (x == nextKnot[0]) {
					moveKnot(
						index + 1,
						nextKnot[0],
						nextKnot[1] + (y - nextKnot[1] > 0 ? 1 : -1)
					);
				} else if (y == nextKnot[1]) {
					moveKnot(
						index + 1,
						nextKnot[0] + (x - nextKnot[0] > 0 ? 1 : -1),
						nextKnot[1]
					);
				} else {
					moveKnot(
						index + 1,
						nextKnot[0] + (x - nextKnot[0] > 0 ? 1 : -1),
						nextKnot[1] + (y - nextKnot[1] > 0 ? 1 : -1)
					);
				}
			}
		} else {
			if (!visited.includes(`${x},${y}`)) {
				visited.push(`${x},${y}`);
			}
		}
	}
}
