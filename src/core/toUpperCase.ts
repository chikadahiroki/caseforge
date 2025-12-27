import { PATTERNS } from "@/utils/patterns";
import { transformObject } from "@/utils/transform";
import { isObject, isString } from "@/utils/typeGuards";

/**
 * Converts a string to UPPER_SNAKE_CASE format at the type level.
 * @example "userName" -> "USER_NAME"
 */
type UpperCase<
	S extends string,
	First extends boolean = true,
> = S extends `${infer C}${infer R}`
	? C extends "_" | "-"
		? `_${UpperCase<R, false>}`
		: C extends Uppercase<C>
			? First extends true
				? `${Uppercase<C>}${UpperCase<R, false>}`
				: `_${Uppercase<C>}${UpperCase<R, false>}`
			: `${Uppercase<C>}${UpperCase<R, false>}`
	: Uppercase<S>;

/**
 * Converts all object keys to UPPER_SNAKE_CASE format at the type level.
 * @example { userName: "John Doe" } -> { USER_NAME: "John Doe" }
 */
type UpperCaseKeys<T> = {
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
	return str
		.replace(PATTERNS.UPPERCASE, (char) => `_${char.toLowerCase()}`)
		.replace(PATTERNS.CONSECUTIVE_SEPARATORS, "_")
		.replace(PATTERNS.EDGE_SEPARATORS, "")
		.toUpperCase();
}

/**
 * Converts strings or object keys to UPPER_SNAKE_CASE format.
 * @param input - A string or object to convert.
 * @returns The UPPER_SNAKE_CASE string or object.
 */
export function toUpperCase<T extends string>(input: T): UpperCase<T>;
export function toUpperCase<T extends object>(input: T): UpperCaseKeys<T>;
export function toUpperCase(input: unknown): unknown {
	if (isString(input)) {
		return upperCaseString(input);
	}
	if (isObject(input)) {
		return transformObject(input, upperCaseString);
	}
	return input;
}
