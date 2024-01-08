function getDistance(t, limit) {
	return t * (limit - t);
}

function getTimes(limit, distance) {
	let t1 = (limit - Math.sqrt(limit * limit - 4 * distance)) / 2;
	let t2 = (limit + Math.sqrt(limit * limit - 4 * distance)) / 2;
	return [t1 % 1 == 0 ? t1 + 1 : Math.ceil(t1), t2 % 1 == 0 ? t2 - 1 : Math.floor(t2)];
}

// console.log(getTimes(30, 200));

let input = `Time:        56     97     78     75
Distance:   546   1927   1131   1139`;

let lines = input.split("\n");

let race = lines.map((line) =>
	line
		.split(" ")
		.slice(1)
		.filter((cell) => cell != "")
		.join("")
);

console.log(race);

let dist = Number(race[1]);
let times = getTimes(Number(race[0]), dist);
let answers = times[1] - times[0] + 1;

console.log(answers);
