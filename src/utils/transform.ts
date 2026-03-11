import { isArray, isBuiltIn, isObject, isString } from "./typeGuards";

/**
 * Converts an unknown value to the desired case.
 * @param input - The input value to convert.
 * @param convertString - Function to convert a string to the desired case.
 * @returns The converted value.
 */
export function convertInput(
	input: unknown,
	convertString: (str: string) => string,
): unknown {
	if (isString(input)) {
		return convertString(input);
	}
	if (isArray(input)) {
		return input.map((item) => convertInput(item, convertString));
	}
	if (isObject(input)) {
		return transformObject(input, convertString);
	}

	return input;
}

/**
 * Generic object key transformation.
 * @param object - The object to transform.
 * @param transformKey - Function to transform each key.
 * @returns The transformed object.
 */
export function transformObject<T>(
	object: Record<string, unknown>,
	transformKey: (key: string) => string,
): T {
	const result = {} as Record<string, unknown>;

	for (const [key, value] of Object.entries(object)) {
		const newKey = transformKey(key);

		if (isBuiltIn(value)) {
			result[newKey] = value;
		} else if (isArray(value)) {
			result[newKey] = value.map((item) => convertInput(item, transformKey));
		} else if (isObject(value)) {
			result[newKey] = transformObject(value, transformKey);
		} else {
			result[newKey] = value;
		}
	}

	return result as T;
}
