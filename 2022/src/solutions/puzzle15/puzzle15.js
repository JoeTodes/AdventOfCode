let rocks;
let s;
let pile = 0;
let done = false;
// const offset = 400;
async function setup() {
	rocks = await loadRocks();
	let maxDepth = rocks.reduce(
		(acc, cur) => Math.max(acc, cur[0].y),
		0
	);

	console.log(maxDepth);
	s = new Sand();
	createCanvas(400, 800);
	frameRate(200);
	while (!done) {
		s.update(rocks);
		if (pile % 1000 == 0) {
			draw();
		}
	}
}

function draw() {
	if (rocks) {
		deleteBuriedSand();
		scale(4);
		translate(-475, 0);
		background(220);
		drawRocks(rocks);
		// s.draw();
	}
}

function deleteBuriedSand() {
	console.log(rocks.length);
	rocks = rocks.filter((rock) => {
		if (rock[0].dist(rock[1]) == 0) {
			let a = false;
			let al = false;
			let ar = false;
			for (const r of rocks) {
				if (
					isPointOnLine(
						createVector(rock[0].x, rock[0].y - 1),
						r[0],
						r[1]
					)
				)
					a = true;
				if (
					isPointOnLine(
						createVector(rock[0].x - 1, rock[0].y - 1),
						r[0],
						r[1]
					)
				)
					al = true;
				if (
					isPointOnLine(
						createVector(rock[0].x + 1, rock[0].y - 1),
						r[0],
						r[1]
					)
				)
					ar = true;
				if (a && al && ar) return false;
			}
		}
		return true;
	});
}

async function loadRocks() {
	let res = await fetch("./14.txt");
	let input = (await res.text())
		.split("\n")
		.map((line) => line.split(" -> "));
	let rocks = [];
	input.forEach((line) => {
		line.forEach((coord, i, arr) => {
			if (i == line.length - 1) return;

			rocks.push([
				createVector(...coord.split(",")),
				createVector(...arr[i + 1].split(",")),
			]);
		});
	});

	return rocks;
}

function drawRocks(rocks) {
	stroke("red");
	strokeWeight(1);
	rocks.forEach((rock) => {
		line(rock[0].x, rock[0].y, rock[1].x, rock[1].y);
	});
}

class Sand {
	constructor() {
		this.pos = createVector(500, 0);
	}
	draw() {
		stroke("brown");
		point(this.pos.x, this.pos.y);
	}
	update(rocks) {
		let newPos = createVector(this.pos.x, this.pos.y + 1);
		let smallRocks = rocks.filter((rock) => {
			return (
				isPointOnLine(newPos, rock[0], rock[1]) ||
				isPointOnLine(
					createVector(this.pos.x - 1, this.pos.y + 1),
					rock[0],
					rock[1]
				) ||
				isPointOnLine(
					createVector(this.pos.x + 1, this.pos.y + 1),
					rock[0],
					rock[1]
				)
			);
		});
		if (
			newPos.y != 160 &&
			!smallRocks.some((rock) =>
				isPointOnLine(newPos, rock[0], rock[1])
			)
		) {
			this.pos = newPos;
			return;
		}
		newPos.x--;
		if (
			newPos.y != 160 &&
			!smallRocks.some((rock) =>
				isPointOnLine(newPos, rock[0], rock[1])
			)
		) {
			this.pos = newPos;
			return;
		}
		newPos.x += 2;
		if (
			newPos.y != 160 &&
			!smallRocks.some((rock) =>
				isPointOnLine(newPos, rock[0], rock[1])
			)
		) {
			this.pos = newPos;
			return;
		}
		rocks.push([this.pos, this.pos]);
		pile++;
		console.log(pile);
		if (this.pos.x == 500 && this.pos.y == 0) {
			done = true;
		}
		this.pos = createVector(500, 0);
	}
}

function isPointOnLine(point, lineStart, lineEnd) {
	return (
		p5.Vector.dist(lineStart, lineEnd) ==
		p5.Vector.dist(lineStart, point) + p5.Vector.dist(lineEnd, point)
	);
}
