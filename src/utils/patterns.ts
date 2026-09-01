/**
 * Common regular expression patterns for case conversion.
 */
export const PATTERNS = {
	/** Matches words in a string */
	WORDS: /[a-z]+|[A-Z]{2,}(?=[A-Z][a-z]|\d|[_-]|$)|[A-Z][a-z]*|\d+/g,

	/** Matches a complete camelCase string */
	CAMEL_CASE: /^[a-z][a-zA-Z0-9]*$/,

	/** Matches a complete kebab-case string */
	KEBAB_CASE: /^[a-z][a-z0-9-]*$/,

	/** Matches a complete PascalCase string */
	PASCAL_CASE: /^[A-Z][a-zA-Z0-9]*$/,

	/** Matches a complete snake_case string */
	SNAKE_CASE: /^[a-z][a-z0-9_]*$/,

	/** Matches a complete UPPER_SNAKE_CASE string */
	UPPER_CASE: /^[A-Z][A-Z0-9_]*$/,
} as const;
