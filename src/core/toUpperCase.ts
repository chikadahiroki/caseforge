import { type JoinUpper, type SplitWords, splitWords } from "@/utils/tokenizer";
import { convertInput } from "@/utils/transform";

/**
 * Converts a string to UPPER_SNAKE_CASE format at the type level.
 * @example "userName" -> "USER_NAME"
 */
export type UpperCase<S extends string> = JoinUpper<SplitWords<S>>;

/**
 * Converts all object keys to UPPER_SNAKE_CASE format at the type level.
 * @example { userName: "John Doe" } -> { USER_NAME: "John Doe" }
 */
export type UpperCaseKeys<T> = {
	[K in keyof T as UpperCase<K & string>]: T[K] extends readonly (infer U)[]
		? U extends object
			? readonly UpperCaseKeys<U>[]
			: T[K]
		: T[K] extends object
			? UpperCaseKeys<T[K]>
			: T[K];
};

/**
 * Converts a string to UPPER_SNAKE_CASE format.
 * @param str - The string to convert.
 * @returns The UPPER_SNAKE_CASE string.
 */
function upperCaseString(str: string): string {
	const words = splitWords(str);
	return words.length === 0 ? str : words.join("_").toUpperCase();
}

/**
 * Converts strings or object keys to UPPER_SNAKE_CASE format.
 * @param input - A string or object to convert.
 * @returns The UPPER_SNAKE_CASE string or object.
 */
export function toUpperCase<T extends string>(input: T): UpperCase<T>;
export function toUpperCase<T extends object>(
	input: readonly T[],
): UpperCaseKeys<T>[];
export function toUpperCase<T extends object>(input: T): UpperCaseKeys<T>;
export function toUpperCase(input: unknown): unknown {
	return convertInput(input, upperCaseString);
}
