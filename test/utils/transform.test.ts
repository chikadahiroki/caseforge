import { describe, expect, it } from "bun:test";
import { convertInput, transformObject } from "../../src/utils/transform";

describe("transform", () => {
	const toUpper = (str: string) => str.toUpperCase();

	describe("convertInput", () => {
		it("converts string input", () => {
			expect(convertInput("hello", toUpper)).toBe("HELLO");
		});

		it("converts array of objects", () => {
			const input = [{ key: "value" }];
			const result = convertInput(input, toUpper);
			expect(result).toEqual([{ KEY: "value" }]);
		});

		it("converts object input", () => {
			const input = { key: "value" };
			const result = convertInput(input, toUpper);
			expect(result).toEqual({ KEY: "value" });
		});

		it("returns other values as-is", () => {
			expect(convertInput(123, toUpper)).toBe(123);
			expect(convertInput(null, toUpper)).toBe(null);
		});
	});

	describe("transformObject", () => {
		it("transforms object keys", () => {
			const input = { userId: "1", age: 30 };
			const result = transformObject(input, toUpper);
			expect(result).toEqual({ USERID: "1", AGE: 30 });
		});

		it("transforms nested objects", () => {
			const input = { user: { userName: "John" } };
			const result = transformObject(input, toUpper);
			expect(result).toEqual({ USER: { USERNAME: "John" } });
		});

		it("transforms arrays of objects", () => {
			const input = { users: [{ userId: "1" }, { userId: "2" }] };
			const result = transformObject(input, toUpper);
			expect(result).toEqual({ USERS: [{ USERID: "1" }, { USERID: "2" }] });
		});

		it("preserves built-in objects", () => {
			const date = new Date();
			const input = { date };
			const result = transformObject(input, toUpper);
			expect(result).toEqual({ DATE: date });
		});

		it("handles null and undefined", () => {
			const input = { a: null, b: undefined };
			const result = transformObject(input, toUpper);
			expect(result).toEqual({ A: null, B: undefined });
		});

		it("preserves nested arrays", () => {
			const input = {
				matrix: [
					[1, 2],
					[3, 4],
				],
			};
			const result = transformObject(input, toUpper);
			expect(result).toEqual({
				MATRIX: [
					[1, 2],
					[3, 4],
				],
			});
		});
	});
});
