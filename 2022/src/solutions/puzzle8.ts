import { parseInputBySymbol } from "../util";

const input = parseInputBySymbol("08.txt")
	.filter((line) => line)
	.map((line) => Array.from(line).map((tree) => Number(tree)));

function isVisible(i, j) {
	if (
		i == 0 ||
		j == 0 ||
		i == input[0].length - 1 ||
		j == input.length - 1
	) {
		return true;
	} else {
		let h = input[j][i];
		let fromLeft = true;
		for (const tree of input[j].slice(0, i)) {
			if (tree >= h) {
				fromLeft = false;
				break;
			}
		}
		let fromRight = true;
		for (const tree of input[j].slice(i + 1)) {
			if (tree >= h) {
				fromRight = false;
				break;
			}
		}

		let fromTop = true;
		for (const row of input.slice(0, j)) {
			if (row[i] >= h) {
				fromTop = false;
				break;
			}
		}
		let fromBottom = true;
		for (const row of input.slice(j + 1)) {
			if (row[i] >= h) {
				fromBottom = false;
				break;
			}
		}

		return fromLeft || fromRight || fromTop || fromBottom;
	}

	return false;
}

// console.log(input);
// console.log(
// 	input
// 		.map((row, j) =>
// 			row
// 				.map((tree, i) => isVisible(i, j))
// 				.reduce((acc, cur) => acc + (cur ? 1 : 0), 0)
// 		)
// 		.reduce((acc, cur) => acc + cur)
// );

function scenicScore(i, j) {
	let h = input[j][i];
	let fromLeft = 0;
	for (const tree of input[j].slice(0, i).reverse()) {
		fromLeft++;
		if (tree >= h) {
			break;
		}
	}
	let fromRight = 0;
	for (const tree of input[j].slice(i + 1)) {
		fromRight++;
		if (tree >= h) {
			break;
		}
	}

	let fromTop = 0;
	for (const row of input.slice(0, j).reverse()) {
		fromTop++;
		if (row[i] >= h) {
			break;
		}
	}
	let fromBottom = 0;
	for (const row of input.slice(j + 1)) {
		fromBottom++;
		if (row[i] >= h) {
			break;
		}
	}

	// console.log({ h, fromLeft, fromRight, fromTop, fromBottom });

	return fromLeft * fromRight * fromTop * fromBottom;
}

console.log(
	input
		.map((row, j) =>
			row.map((tree, i) => scenicScore(i, j)).sort((a, b) => b - a)
		)
		.sort((a, b) => b[0] - a[0])[0][0]
);
