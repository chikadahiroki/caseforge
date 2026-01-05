import { PATTERNS } from "@/utils/patterns";
import { transformObject } from "@/utils/transform";
import { isObject, isString } from "@/utils/typeGuards";

/**
 * Converts a string to kebab-case format at the type level.
 * @example "userName" -> "user-name"
 */
type KebabCase<
	S extends string,
	First extends boolean = true,
> = S extends `${infer C}${infer R}`
	? C extends "_"
		? `-${KebabCase<R, false>}`
		: C extends Uppercase<C>
			? First extends true
				? `${Lowercase<C>}${KebabCase<R, false>}`
				: `-${Lowercase<C>}${KebabCase<R, false>}`
			: `${C}${KebabCase<R, false>}`
	: S;

/**
 * Converts all object keys to kebab-case format at the type level.
 * @example { userName: "John Doe" } -> { "user-name": "John Doe" }
 */
type KebabCaseKeys<T> = {
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
	return str
		.replace(PATTERNS.UPPERCASE, (char) => `-${char.toLowerCase()}`)
		.replace(PATTERNS.CONSECUTIVE_SEPARATORS, "-")
		.replace(PATTERNS.EDGE_SEPARATORS, "");
}

/**
 * Converts strings or object keys to kebab-case format.
 * @param input - A string or object to convert.
 * @returns The kebab-case string or object.
 */
export function toKebabCase<T extends string>(input: T): KebabCase<T>;
export function toKebabCase<T extends object>(input: T): KebabCaseKeys<T>;
export function toKebabCase(input: unknown): unknown {
	if (isString(input)) {
		return kebabCaseString(input);
	}
	if (isObject(input)) {
		return transformObject(input, kebabCaseString);
	}
	return input;
}
