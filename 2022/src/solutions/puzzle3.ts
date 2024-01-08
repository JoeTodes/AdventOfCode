import { parseInputBySymbol } from "../util";

// const partA = parseInputBySymbol("03.txt")
// 	.filter((line) => line)
// 	.map((line) => [
// 		line.slice(0, line.length / 2),
// 		line.slice(line.length / 2),
// 	])
// 	.map((pair) => {
// 		let front = Array.from(pair[0]);
// 		let back = Array.from(pair[1]);
// 		let match = front.filter((char) => back.includes(char));

// 		return getPriority(match[0]);
// 	})
// 	.reduce((acc, cur) => acc + cur, 0);

// console.log(partA);

function getPriority(char: string): number {
	let charCode = char.charCodeAt(0);
	if (charCode >= 97) {
		charCode -= 96;
	} else {
		charCode -= 38;
	}
	return charCode;
}

const partB = parseInputBySymbol("03.txt").filter((line) => line);
let badges = [];
for (let i = 0; i < partB.length; i += 3) {
	let A = Array.from(partB[i]);
	let B = Array.from(partB[i + 1]);
	let C = Array.from(partB[i + 2]);
	badges.push(
		A.filter((char) => B.includes(char) && C.includes(char))[0]
	);
}
console.log(badges.reduce((acc, cur) => acc + getPriority(cur), 0));
