import { describe, it, expect } from "bun:test";
import { isString, isArray, isObject, isBuiltIn } from "../../src/utils/typeGuards";

describe("typeGuards", () => {
	describe("isString", () => {
		it("returns true for strings", () => {
			expect(isString("user")).toBe(true);
			expect(isString("")).toBe(true);
		});

		it("returns false for non-strings", () => {
			expect(isString(123)).toBe(false);
			expect(isString(null)).toBe(false);
			expect(isString({})).toBe(false);
		});
	});

	describe("isArray", () => {
		it("returns true for arrays", () => {
			expect(isArray([])).toBe(true);
			expect(isArray([1, 2, 3])).toBe(true);
		});

		it("returns false for non-arrays", () => {
			expect(isArray({})).toBe(false);
			expect(isArray("array")).toBe(false);
			expect(isArray(null)).toBe(false);
		});
	});

	describe("isObject", () => {
		it("returns true for plain objects", () => {
			expect(isObject({})).toBe(true);
			expect(isObject({ key: "value" })).toBe(true);
		});

		it("returns false for arrays", () => {
			expect(isObject([])).toBe(false);
		});

		it("returns false for null and non-objects", () => {
			expect(isObject(null)).toBe(false);
			expect(isObject("string")).toBe(false);
			expect(isObject(123)).toBe(false);
		});
	});

	describe("isBuiltIn", () => {
		it("returns true for Date", () => {
			expect(isBuiltIn(new Date())).toBe(true);
		});

		it("returns true for RegExp", () => {
			expect(isBuiltIn(/user/)).toBe(true);
		});

		it("returns true for functions", () => {
			expect(isBuiltIn(() => {})).toBe(true);
		});

		it("returns false for other values", () => {
			expect(isBuiltIn({})).toBe(false);
			expect(isBuiltIn("user")).toBe(false);
			expect(isBuiltIn(123)).toBe(false);
		});
	});
});