import {
	type JoinPascal,
	type SplitWords,
	splitWords,
} from "@/utils/tokenizer";
import { convertInput } from "@/utils/transform";

/**
 * Converts a string to PascalCase format at the type level.
 * @example "user_name" -> "UserName"
 */
export type PascalCase<S extends string> = JoinPascal<SplitWords<S>>;

/**
 * Converts all object keys to PascalCase format at the type level.
 * @example { user_name: "John Doe" } -> { UserName: "John Doe" }
 */
export type PascalCaseKeys<T> = {
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
	const words = splitWords(str);
	if (words.length === 0) return str;
	return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
}

/**
 * Converts strings or object keys to PascalCase format.
 * @param input - A string or object to convert.
 * @returns The PascalCase string or object.
 */
export function toPascalCase<T extends string>(input: T): PascalCase<T>;
export function toPascalCase<T extends object>(
	input: readonly T[],
): PascalCaseKeys<T>[];
export function toPascalCase<T extends object>(input: T): PascalCaseKeys<T>;
export function toPascalCase(input: unknown): unknown {
	return convertInput(input, pascalCaseString);
}
