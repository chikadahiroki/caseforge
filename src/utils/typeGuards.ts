/**
 * Checks if a value is a string.
 * @param value - The value to check.
 * @returns `true` if the value is a string, `false` otherwise.
 */
export function isString(value: unknown): value is string {
	return typeof value === "string";
}

/**
 * Checks if a value is an array.
 * @param value - The value to check.
 * @returns `true` if the value is an array, `false` otherwise.
 */
export function isArray(value: unknown): value is unknown[] {
	return Array.isArray(value);
}

/**
 * Checks if a value is a plain object.
 * @param value - The value to check.
 * @returns `true` if the value is a plain object, `false` otherwise.
 */
export function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !isArray(value);
}

/**
 * Checks if a value is a built-in object.
 * @param value - The value to check.
 * @returns `true` if the value is a built-in object, `false` otherwise.
 */
export function isBuiltIn(value: unknown): boolean {
	return (
		value instanceof Date ||
		value instanceof RegExp ||
		typeof value === "function"
	);
}
