import { parseInputBySymbol } from "../util";

const elfRawInventories: string[] = parseInputBySymbol(
	"01.txt",
	"\n\n"
);
const elfParsedInventories: string[][] = elfRawInventories.map(
	(elf) => elf.split("\n")
);

const elfTotals: number[] = elfParsedInventories.map((elf) =>
	elf.reduce((acc: number, cur: string) => acc + Number(cur), 0)
);

const sortedElfTotals: number[] = [...elfTotals].sort(
	(a: number, b: number) => b - a
);

const top3 = sortedElfTotals
	.slice(0, 3)
	.reduce((acc, cur) => acc + cur, 0);

console.log(top3);

const answer: number = parseInputBySymbol("01.txt", "\n\n")
	.map((elf) => elf.split("\n"))
	.map((elf) => elf.reduce((acc, cur) => acc + Number(cur), 0))
	.sort((a, b) => b - a)
	.slice(0, 3)
	.reduce((acc, cur) => acc + cur, 0);

console.log(answer);
