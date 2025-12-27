import { PATTERNS } from "@/utils/patterns";
import { transformObject } from "@/utils/transform";
import { isObject, isString } from "@/utils/typeGuards";

/**
 * Converts a string to PascalCase format at the type level.
 * @example "user_name" -> "UserName"
 */
type PascalCase<S extends string> = S extends `${infer Head}_${infer Tail}`
	? `${Capitalize<Lowercase<Head>>}${PascalCase<Tail>}`
	: S extends `${infer Head}-${infer Tail}`
		? `${Capitalize<Lowercase<Head>>}${PascalCase<Tail>}`
		: S extends `${infer First}${infer Rest}`
			? `${Capitalize<First>}${Rest}`
			: S;

/**
 * Converts all object keys to PascalCase format at the type level.
 * @example { user_name: "John Doe" } -> { UserName: "John Doe" }
 */
type PascalCaseKeys<T> = {
	[K in keyof T as PascalCase<K & string>]: T[K] extends readonly (infer U)[]
		? U extends object
			? readonly PascalCaseKeys<U>[]
			: T[K]
		: T[K] extends object
			? PascalCaseKeys<T[K]>
			: T[K];
};

/**
 * Converts a string to PascalCase format.
 * @param str - The string to convert.
 * @returns The PascalCase string.
 */
function pascalCaseString(str: string): string {
	return str
		.replace(PATTERNS.SEPARATOR_WITH_CHAR, (_, char) => char.toUpperCase())
		.replace(PATTERNS.EDGE_SEPARATORS, "")
		.replace(PATTERNS.LEADING_LOWER, (char) => char.toUpperCase());
}

/**
 * Converts strings or object keys to PascalCase format.
 * @param input - A string or object to convert.
 * @returns The PascalCase string or object.
 */
export function toPascalCase<T extends string>(input: T): PascalCase<T>;
export function toPascalCase<T extends object>(input: T): PascalCaseKeys<T>;
export function toPascalCase(input: unknown): unknown {
	if (isString(input)) {
		return pascalCaseString(input);
	}
	if (isObject(input)) {
		return transformObject(input, pascalCaseString);
	}
	return input;
}
