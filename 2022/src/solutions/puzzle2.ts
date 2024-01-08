import { parseInputBySymbol } from "../util";

// const results = {
// 	A: {
// 		X: 3,
// 		Y: 6,
// 		Z: 0,
// 	},
// 	B: {
// 		X: 0,
// 		Y: 3,
// 		Z: 6,
// 	},
// 	C: {
// 		X: 6,
// 		Y: 0,
// 		Z: 3,
// 	},
// };
// const moves = {
// 	A: {
// 		X: "S",
// 		Y: "R",
// 		Z: "P",
// 	},
// 	B: {
// 		X: "R",
// 		Y: "P",
// 		Z: "S",
// 	},
// 	C: {
// 		X: "P",
// 		Y: "S",
// 		Z: "R",
// 	},
// };
// const choiceValues = {
// 	R: 1,
// 	P: 2,
// 	S: 3,
// };
// const outcomes = {
// 	X: 0,
// 	Y: 3,
// 	Z: 6,
// };

// const turnScore = (opponent: string, outcome: string): number => {
// 	return choiceValues[moves[opponent][outcome]] + outcomes[outcome];
// };

// let score = parseInputBySymbol("02.txt", "\n")
// 	.map((turn) => turn.split(" "))
// 	.filter((turn) => turn[0] && turn[1])
// 	.reduce((acc, turn) => (acc += turnScore(turn[0], turn[1])), 0);

// console.log(score);

//V2
// const charCodeA = 65;
// const charCodeX = 88;

// const crispTurnScore = (turn: string): number => {
// 	const outcome = turn.charCodeAt(2) - charCodeX;
// 	const outcomeVal = outcome * 3;
// 	const opponent = turn.charCodeAt(0) - charCodeA + 1;
// 	let move = opponent + outcome - 1;
// 	if (move == 0) {
// 		move = 3;
// 	}
// 	if (move == 4) {
// 		move = 1;
// 	}

// 	return outcomeVal + move;
// };

// let score = parseInputBySymbol("02.txt", "\n")
// 	.filter((turn) => turn.length)
// 	.reduce((acc, turn) => (acc += crispTurnScore(turn)), 0);

// console.log(score);

//V3
const charCodeA = 65;
const charCodeX = 88;
const moveVals = [1, 2, 3];

const crispTurnScore = (turn: string): number => {
	const outcome = turn.charCodeAt(2) - charCodeX;
	const opponent = turn.charCodeAt(0) - charCodeA;

	return outcome * 3 + moveVals.at((opponent + outcome - 1) % 3);
};
let score = parseInputBySymbol("02.txt", "\n")
	.filter((turn) => turn.length)
	.reduce((acc, turn) => (acc += crispTurnScore(turn)), 0);

console.log(score);
