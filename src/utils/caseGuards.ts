import { PATTERNS } from "./patterns";
import { isString } from "./typeGuards";

/**
 * Checks if a string is in camelCase format.
 * @param value - The value to check.
 * @returns `true` if the value is in camelCase format, `false` otherwise.
 */
export function isCamelCase(value: unknown): boolean {
	if (!isString(value)) return false;
	return (
		PATTERNS.CAMEL_CASE.test(value) &&
		!value.includes("_") &&
		!value.includes("-")
	);
}

/**
 * Checks if a string is in snake_case format.
 * @param value - The value to check.
 * @returns `true` if the value is in snake_case format, `false` otherwise.
 */
export function isSnakeCase(value: unknown): boolean {
	if (!isString(value)) return false;
	return (
		PATTERNS.SNAKE_CASE.test(value) &&
		!value.includes("-") &&
		!PATTERNS.UPPERCASE.test(value)
	);
}

/**
 * Checks if a string is in kebab-case format.
 * @param value - The value to check.
 * @returns `true` if the value is in kebab-case format, `false` otherwise.
 */
export function isKebabCase(value: unknown): boolean {
	if (!isString(value)) return false;
	return (
		PATTERNS.KEBAB_CASE.test(value) &&
		!value.includes("_") &&
		!PATTERNS.UPPERCASE.test(value)
	);
}

/**
 * Checks if a string is in PascalCase format.
 * @param value - The value to check.
 * @returns `true` if the value is in PascalCase format, `false` otherwise.
 */
export function isPascalCase(value: unknown): boolean {
	if (!isString(value)) return false;
	return (
		PATTERNS.PASCAL_CASE.test(value) &&
		!value.includes("_") &&
		!value.includes("-")
	);
}

/**
 * Checks if a string is in UPPER_SNAKE_CASE format.
 * @param value - The value to check.
 * @returns `true` if the value is in UPPER_SNAKE_CASE format, `false` otherwise.
 */
export function isUpperCase(value: unknown): boolean {
	if (!isString(value)) return false;
	return PATTERNS.UPPER_SNAKE_CASE.test(value) && !value.includes("-");
}
