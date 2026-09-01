import { type JoinKebab, type SplitWords, splitWords } from "@/utils/tokenizer";
import { convertInput } from "@/utils/transform";

/**
 * Converts a string to kebab-case format at the type level.
 * @example "userName" -> "user-name"
 */
export type KebabCase<S extends string> = JoinKebab<SplitWords<S>>;

/**
 * Converts all object keys to kebab-case format at the type level.
 * @example { userName: "John Doe" } -> { "user-name": "John Doe" }
 */
export type KebabCaseKeys<T> = {
	[K in keyof T as KebabCase<K & string>]: T[K] extends readonly (infer U)[]
		? U extends object
			? readonly KebabCaseKeys<U>[]
			: T[K]
		: T[K] extends object
			? KebabCaseKeys<T[K]>
			: T[K];
};

/**
 * Converts a string to kebab-case format.
 * @param str - The string to convert.
 * @returns The kebab-case string.
 */
function kebabCaseString(str: string): string {
	const words = splitWords(str);
	return words.length === 0 ? str : words.join("-");
}

/**
 * Converts strings or object keys to kebab-case format.
 * @param input - A string or object to convert.
 * @returns The kebab-case string or object.
 */
export function toKebabCase<T extends string>(input: T): KebabCase<T>;
export function toKebabCase<T extends object>(
	input: readonly T[],
): KebabCaseKeys<T>[];
export function toKebabCase<T extends object>(input: T): KebabCaseKeys<T>;
export function toKebabCase(input: unknown): unknown {
	return convertInput(input, kebabCaseString);
}
