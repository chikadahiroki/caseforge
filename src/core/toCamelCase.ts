import { type JoinCamel, type SplitWords, splitWords } from "@/utils/tokenizer";
import { convertInput } from "@/utils/transform";

/**
 * Converts a string to camelCase format at the type level.
 * @example "user_name" -> "userName"
 */
export type CamelCase<S extends string> = JoinCamel<SplitWords<S>>;

/**
 * Converts all object keys to camelCase format at the type level.
 * @example { user_name: "John Doe" } -> { userName: "John Doe" }
 */
export type CamelCaseKeys<T> = {
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
	const words = splitWords(str);
	const [first, ...rest] = words;
	if (first === undefined) return str;
	return (
		first + rest.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("")
	);
}

/**
 * Converts strings or object keys to camelCase format.
 * @param input - A string or object to convert.
 * @returns The camelCase string or object.
 */
export function toCamelCase<T extends string>(input: T): CamelCase<T>;
export function toCamelCase<T extends object>(
	input: readonly T[],
): CamelCaseKeys<T>[];
export function toCamelCase<T extends object>(input: T): CamelCaseKeys<T>;
export function toCamelCase(input: unknown): unknown {
	return convertInput(input, camelCaseString);
}
