/**
 * Common regular expression patterns for case conversion.
 */
export const PATTERNS = {
	/** Matches a leading uppercase letter */
	LEADING_UPPER: /^[A-Z]/,

	/** Matches all uppercase letters */
	UPPERCASE: /[A-Z]/g,

	/** Matches a leading lowercase letter */
	LEADING_LOWER: /^[a-z]/,

	/** Matches separators (_-) followed by any character */
	SEPARATOR_WITH_CHAR: /[_-]+(.)/g,

	/** Matches leading/trailing separators */
	EDGE_SEPARATORS: /^[_-]+|[_-]+$/g,

	/** Matches consecutive separators */
	CONSECUTIVE_SEPARATORS: /[_-]+/g,

	/** Matches a complete camelCase string */
	CAMEL_CASE: /^[a-z][a-zA-Z0-9]*$/,

	/** Matches a complete kebab-case string */
	KEBAB_CASE: /^[a-z][a-z0-9-]*$/,

	/** Matches a complete PascalCase string */
	PASCAL_CASE: /^[A-Z][a-zA-Z0-9]*$/,

	/** Matches a complete snake_case string */
	SNAKE_CASE: /^[a-z][a-z0-9_]*$/,

	/** Matches a complete UPPER_SNAKE_CASE string */
	UPPER_SNAKE_CASE: /^[A-Z][A-Z0-9_]*$/,
} as const;
