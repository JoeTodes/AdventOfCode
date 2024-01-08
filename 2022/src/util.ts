import fs from "fs";
import path from "path";

export function parseInputBySymbol(
	file: string,
	splitter: string = "\n"
): string[] {
	const text = fs.readFileSync(
		path.join(__dirname, "./inputs", file),
		{ encoding: "utf-8" }
	);
	return text.split(splitter);
}

export function range(
	start: number,
	stop: number,
	step = 1
): number[] {
	return Array.from(
		{ length: (stop - start) / step + 1 },
		(_, i) => start + i * step
	);
}
