import { describe, expect, it } from "bun:test";
import { toPascalCase } from "../../src/core/toPascalCase";

describe("toPascalCase", () => {
	describe("string conversion", () => {
		it("converts snake_case to PascalCase", () => {
			expect(toPascalCase("user_id")).toBe("UserId");
			expect(toPascalCase("user_name")).toBe("UserName");
		});

		it("converts kebab-case to PascalCase", () => {
			expect(toPascalCase("user-id")).toBe("UserId");
			expect(toPascalCase("user-name")).toBe("UserName");
		});

		it("converts camelCase to PascalCase", () => {
			expect(toPascalCase("userId")).toBe("UserId");
			expect(toPascalCase("userName")).toBe("UserName");
		});
	});

	describe("object conversion", () => {
		it("converts object keys to PascalCase", () => {
			const input = { userId: 1, userName: "John" };
			const result = toPascalCase(input);
			expect(result).toEqual({ UserId: 1, UserName: "John" });
		});

		it("converts nested objects", () => {
			const input = { user_info: { user_name: "John" } };
			const result = toPascalCase(input);
			expect(result).toEqual({ UserInfo: { UserName: "John" } });
		});

		it("converts nested arrays", () => {
			const input = [{ user_name: "John" }, { user_name: "Jane" }];
			const result = toPascalCase(input);
			expect(result).toEqual([{ UserName: "John" }, { UserName: "Jane" }]);
		});
	});

	it("returns non-string and non-object values as-is", () => {
		// @ts-expect-error testing runtime behavior with invalid input
		expect(toPascalCase(123)).toBe(123);
		// @ts-expect-error testing runtime behavior with invalid input
		expect(toPascalCase(null)).toBe(null);
		// @ts-expect-error testing runtime behavior with invalid input
		expect(toPascalCase(undefined)).toBe(undefined);
	});
});
