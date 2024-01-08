const { log } = require("console");
const fs = require("fs");

let input = fs
	.readFileSync("./day16_full.txt", "utf-8")
	.split("\n")
	.map((line) => line.split(""));

const moves = {
	up: { row: -1, col: 0, dir: "up" },
	down: { row: 1, col: 0, dir: "down" },
	left: { row: 0, col: -1, dir: "left" },
	right: { row: 0, col: 1, dir: "right" },
};

const routes = {
	".": { up: moves.up, down: moves.down, left: moves.left, right: moves.right },
	"/": { up: moves.right, down: moves.left, left: moves.down, right: moves.up },
	"\\": { up: moves.left, down: moves.right, left: moves.up, right: moves.down },
	"|": { up: moves.up, down: moves.down, left: moves.up, right: moves.up },
	"-": { up: moves.left, down: moves.left, left: moves.left, right: moves.right },
};

function moveHead(head, beam) {
	let cell = input[head.row][head.col];
	// console.log(`at ${head.row} ${head.col}: ${cell}`);
	let route = routes[cell][head.dir];
	if (cell == "|" && ["right", "left"].includes(head.dir)) {
		newHead = { row: head.row + 1, col: head.col, dir: "down" };
		if (
			newHead.row >= 0 &&
			newHead.col >= 0 &&
			newHead.row < input.length &&
			newHead.col < input[0].length
		) {
			beam.heads.push(newHead);
		}
	} else if (cell == "-" && ["up", "down"].includes(head.dir)) {
		newHead = { row: head.row, col: head.col + 1, dir: "right" };
		if (
			newHead.row >= 0 &&
			newHead.col >= 0 &&
			newHead.row < input.length &&
			newHead.col < input[0].length
		) {
			beam.heads.push(newHead);
		}
	}

	head.row += route.row;
	head.col += route.col;
	head.dir = route.dir;
}

let max = 0;

for (let i = 0; i < input.length; i++) {
	let beam = {
		heads: [{ row: i, col: 0, dir: "right" }],
		history: [],
	};
	while (beam.heads.length > 0) {
		beam.heads = beam.heads.filter(
			(h) =>
				!beam.history.find(
					(hh) => hh.row == h.row && hh.col == h.col && hh.dir == h.dir
				) &&
				h.row >= 0 &&
				h.col >= 0 &&
				h.row < input.length &&
				h.col < input[0].length
		);
		beam.heads.forEach((h) => {
			beam.history.push(JSON.parse(JSON.stringify(h)));
			moveHead(h, beam);
		});
	}
	let sum = 0;

	beam.history.forEach((h, i) => {
		if (!beam.history.slice(0, i).find((hh) => hh.row == h.row && hh.col == h.col)) {
			sum++;
		}
	});
	console.log(sum);
	max = Math.max(max, sum);

	beam = {
		heads: [{ row: i, col: input[0].length - 1, dir: "left" }],
		history: [],
	};
	while (beam.heads.length > 0) {
		beam.heads = beam.heads.filter(
			(h) =>
				!beam.history.find(
					(hh) => hh.row == h.row && hh.col == h.col && hh.dir == h.dir
				) &&
				h.row >= 0 &&
				h.col >= 0 &&
				h.row < input.length &&
				h.col < input[0].length
		);
		beam.heads.forEach((h) => {
			beam.history.push(JSON.parse(JSON.stringify(h)));
			moveHead(h, beam);
		});
	}
	sum = 0;
	beam.history.forEach((h, i) => {
		if (!beam.history.slice(0, i).find((hh) => hh.row == h.row && hh.col == h.col)) {
			sum++;
		}
	});
	console.log(sum);
	max = Math.max(max, sum);
}
for (let i = 0; i < input[0].length; i++) {
	let beam = {
		heads: [{ row: 0, col: i, dir: "down" }],
		history: [],
	};
	while (beam.heads.length > 0) {
		beam.heads = beam.heads.filter(
			(h) =>
				!beam.history.find(
					(hh) => hh.row == h.row && hh.col == h.col && hh.dir == h.dir
				) &&
				h.row >= 0 &&
				h.col >= 0 &&
				h.row < input.length &&
				h.col < input[0].length
		);
		beam.heads.forEach((h) => {
			beam.history.push(JSON.parse(JSON.stringify(h)));
			moveHead(h, beam);
		});
	}
	let sum = 0;

	beam.history.forEach((h, i) => {
		if (!beam.history.slice(0, i).find((hh) => hh.row == h.row && hh.col == h.col)) {
			sum++;
		}
	});
	console.log(sum);
	max = Math.max(max, sum);

	beam = {
		heads: [{ row: input.length - 1, col: i, dir: "up" }],
		history: [],
	};
	while (beam.heads.length > 0) {
		beam.heads = beam.heads.filter(
			(h) =>
				!beam.history.find(
					(hh) => hh.row == h.row && hh.col == h.col && hh.dir == h.dir
				) &&
				h.row >= 0 &&
				h.col >= 0 &&
				h.row < input.length &&
				h.col < input[0].length
		);
		beam.heads.forEach((h) => {
			beam.history.push(JSON.parse(JSON.stringify(h)));
			moveHead(h, beam);
		});
	}
	sum = 0;
	beam.history.forEach((h, i) => {
		if (!beam.history.slice(0, i).find((hh) => hh.row == h.row && hh.col == h.col)) {
			sum++;
		}
	});
	console.log(sum);
	max = Math.max(max, sum);
}
console.log(max);
