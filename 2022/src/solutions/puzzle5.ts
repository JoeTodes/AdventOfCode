import { parseInputBySymbol } from "../util";

function parseInputStackLine(line) {
	let parsedLine = [];
	for (let i = 1; i < line.length; i += 4) {
		parsedLine.push(line.charAt(i) == " " ? "" : line.charAt(i));
	}
	return parsedLine;
}
function doMove(amount: number, from: number, to: number) {
	// for (let i = 0; i < amount; i++) {
	// 	stacks[to].push(stacks[from].pop());
	// }
	stacks[to].push(...stacks[from].splice(-amount));
}

let input = parseInputBySymbol("05.txt").filter((line) => line);
let inputStacks = input
	.slice(0, 8)
	.map((line) => parseInputStackLine(line));
let inputMoves = input.slice(9).map((line) => line.split(" "));

let stacks = [];
inputStacks[0].forEach((col) => stacks.push([]));
inputStacks.forEach((row) => {
	row.forEach((item, i) => {
		if (item) {
			stacks[i].unshift(item);
		}
	});
});

inputMoves.forEach((move) =>
	doMove(Number(move[1]), Number(move[3]) - 1, Number(move[5]) - 1)
);
console.log(
	stacks.reduce(
		(acc: string, cur: string[]) => acc.concat(cur.at(-1)),
		""
	)
);
