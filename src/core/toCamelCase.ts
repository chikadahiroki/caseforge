import { PATTERNS } from "@/utils/patterns";
import { transformObject } from "@/utils/transform";
import { isObject, isString } from "@/utils/typeGuards";

/**
 * Converts a string to camelCase format at the type level.
 * @example "user_name" -> "userName"
 */
type CamelCase<S extends string> = S extends `${infer A}_${infer B}`
	? `${Lowercase<A>}${Capitalize<CamelCase<B>>}`
	: S extends `${infer A}-${infer B}`
		? `${Lowercase<A>}${Capitalize<CamelCase<B>>}`
		: Uncapitalize<S>;

/**
 * Converts all object keys to camelCase format at the type level.
 * @example { user_name: "John Doe" } -> { userName: "John Doe" }
 */
type CamelCaseKeys<T> = {
	[K in keyof T as CamelCase<K & string>]: T[K] extends readonly (infer U)[]
		? U extends object
			? readonly CamelCaseKeys<U>[]
			: T[K]
		: T[K] extends object
			? CamelCaseKeys<T[K]>
			: T[K];
};

/**
 * Converts a string to camelCase format.
 * @param str - The string to convert.
 * @returns The camelCase string.
 */
function camelCaseString(str: string): string {
	return str
		.replace(PATTERNS.LEADING_UPPER, (char) => char.toLowerCase())
		.replace(PATTERNS.SEPARATOR_WITH_CHAR, (_, char) => char.toUpperCase())
		.replace(PATTERNS.EDGE_SEPARATORS, "");
}

/**
 * Converts strings or object keys to camelCase format.
 * @param input - A string or object to convert.
 * @returns The camelCase string or object.
 */
export function toCamelCase<T extends string>(input: T): CamelCase<T>;
export function toCamelCase<T extends object>(input: T): CamelCaseKeys<T>;
export function toCamelCase(input: unknown): unknown {
	if (isString(input)) {
		return camelCaseString(input);
	}
	if (isObject(input)) {
		return transformObject(input, camelCaseString);
	}
	return input;
}
