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
} as const;
