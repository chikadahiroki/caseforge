import { type JoinSnake, type SplitWords, splitWords } from "@/utils/tokenizer";
import { convertInput } from "@/utils/transform";

/**
 * Converts a string to snake_case format at the type level.
 * @example "userName" -> "user_name"
 */
export type SnakeCase<S extends string> = JoinSnake<SplitWords<S>>;

/**
 * Converts all object keys to snake_case format at the type level.
 * @example { userName: "John Doe" } -> { user_name: "John Doe" }
 */
export type SnakeCaseKeys<T> = {
	[K in keyof T as SnakeCase<K & string>]: T[K] extends readonly (infer U)[]
		? U extends object
			? readonly SnakeCaseKeys<U>[]
			: T[K]
		: T[K] extends object
			? SnakeCaseKeys<T[K]>
			: T[K];
};

/**
 * Converts a string to snake_case format.
 * @param str - The string to convert.
 * @returns The snake_case string.
 */
function snakeCaseString(str: string): string {
	const words = splitWords(str);
	return words.length === 0 ? str : words.join("_");
}

/**
 * Converts strings or object keys to snake_case format.
 * @param input - A string or object to convert.
 * @returns The snake_case string or object.
 */
export function toSnakeCase<T extends string>(input: T): SnakeCase<T>;
export function toSnakeCase<T extends object>(
	input: readonly T[],
): SnakeCaseKeys<T>[];
export function toSnakeCase<T extends object>(input: T): SnakeCaseKeys<T>;
export function toSnakeCase(input: unknown): unknown {
	return convertInput(input, snakeCaseString);
}
