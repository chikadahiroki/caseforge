import { PATTERNS } from "./patterns";

type IsUpperLetter<C extends string> =
	C extends Uppercase<C> ? (C extends Lowercase<C> ? false : true) : false;

type IsLowerLetter<C extends string> =
	C extends Lowercase<C> ? (C extends Uppercase<C> ? false : true) : false;

type SplitByCase<
	S extends string,
	Acc extends string = "",
	PrevUpper extends boolean = false,
> = S extends `${infer C}${infer Rest}`
	? IsUpperLetter<C> extends true
		? PrevUpper extends true
			? Rest extends `${infer Next}${string}`
				? IsLowerLetter<Next> extends true
					? [Lowercase<Acc>, ...SplitByCase<Rest, C, true>]
					: SplitByCase<Rest, `${Acc}${C}`, true>
				: [Lowercase<`${Acc}${C}`>]
			: Acc extends ""
				? SplitByCase<Rest, C, true>
				: [Lowercase<Acc>, ...SplitByCase<Rest, C, true>]
		: SplitByCase<Rest, `${Acc}${C}`, false>
	: Acc extends ""
		? []
		: [Lowercase<Acc>];

type SplitBySep<S extends string> = S extends `${infer A}_${infer B}`
	? [...SplitByCase<A>, ...SplitBySep<B>]
	: S extends `${infer A}-${infer B}`
		? [...SplitByCase<A>, ...SplitBySep<B>]
		: SplitByCase<S>;

export type SplitWords<S extends string> = SplitBySep<S>;

type JoinPascalRest<T extends string[]> = T extends [
	infer F extends string,
	...infer R extends string[],
]
	? `${Capitalize<F>}${JoinPascalRest<R>}`
	: "";

export type JoinCamel<T extends string[]> = T extends [
	infer F extends string,
	...infer R extends string[],
]
	? `${F}${JoinPascalRest<R>}`
	: "";

export type JoinPascal<T extends string[]> = T extends [
	infer F extends string,
	...infer R extends string[],
]
	? `${Capitalize<F>}${JoinPascal<R>}`
	: "";

type JoinSep<T extends string[], Sep extends string> = T extends [
	infer F extends string,
	...infer R extends string[],
]
	? R extends []
		? F
		: `${F}${Sep}${JoinSep<R, Sep>}`
	: "";

export type JoinSnake<T extends string[]> = JoinSep<T, "_">;
export type JoinKebab<T extends string[]> = JoinSep<T, "-">;
export type JoinUpper<T extends string[]> = Uppercase<JoinSep<T, "_">>;

/**
 * Splits a string into words.
 * @param str - The string to split.
 * @returns The words in the string.
 */
export function splitWords(str: string): string[] {
	return str.match(PATTERNS.WORDS)?.map((w) => w.toLowerCase()) ?? [];
}
