import { isArray, isBuiltIn, isObject } from "./typeGuards";

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
			result[newKey] = value.map((item) =>
				isObject(item) && !isArray(item)
					? transformObject(item, transformKey)
					: item,
			);
		} else if (isObject(value)) {
			result[newKey] = transformObject(value, transformKey);
		} else {
			result[newKey] = value;
		}
	}

	return result as T;
}
