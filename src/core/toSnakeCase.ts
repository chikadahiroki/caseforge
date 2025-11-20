import { PATTERNS } from "@/utils/patterns";
import { transformObject } from "@/utils/transform";
import { isString } from "@/utils/typeGuards";

/**
 * Converts a string to snake_case format at the type level.
 * @example "userName" -> "user_name"
 */
type SnakeCase<
	S extends string,
	First extends boolean = true,
> = S extends `${infer C}${infer R}`
	? C extends "_" | "-"
		? `_${SnakeCase<R, false>}`
		: C extends Uppercase<C>
			? First extends true
				? `${Lowercase<C>}${SnakeCase<R, false>}`
				: `_${Lowercase<C>}${SnakeCase<R, false>}`
			: `${C}${SnakeCase<R, false>}`
	: S;

/**
 * Converts all object keys to snake_case format at the type level.
 * @example { userName: "John Doe" } -> { user_name: "John Doe" }
 */
type SnakeCaseKeys<T> = {
	[K in keyof T as SnakeCase<K & string>]: T[K] extends Array<infer U>
		? U extends Record<string, unknown>
			? Array<SnakeCaseKeys<U>>
			: T[K]
		: T[K] extends Record<string, unknown>
			? SnakeCaseKeys<T[K]>
			: T[K];
};

/**
 * Converts a string to snake_case format.
 * @param str - The string to convert.
 * @returns The snake_case string.
 */
function snakeCaseString(str: string): string {
	return str
		.replace(PATTERNS.UPPERCASE, (char) => `_${char.toLowerCase()}`)
		.replace(PATTERNS.CONSECUTIVE_SEPARATORS, "_")
		.replace(PATTERNS.EDGE_SEPARATORS, "");
}

/**
 * Converts strings or object keys to snake_case format.
 * @param input - A string or object to convert.
 * @returns The snake_case string or object.
 */
export function toSnakeCase<T extends string>(input: T): SnakeCase<T>;
export function toSnakeCase<T extends Record<string, unknown>>(
	input: T,
): SnakeCaseKeys<T>;
export function toSnakeCase(input: string | Record<string, unknown>) {
	return isString(input)
		? snakeCaseString(input)
		: transformObject(input, snakeCaseString);
}
