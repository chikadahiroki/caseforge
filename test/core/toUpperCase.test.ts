import { describe, expect, it } from "bun:test";
import { toUpperCase } from "../../src/core/toUpperCase";

describe("toUpperCase", () => {
	describe("string conversion", () => {
		it("converts camelCase to UPPER_SNAKE_CASE", () => {
			expect(toUpperCase("userId")).toBe("USER_ID");
			expect(toUpperCase("userName")).toBe("USER_NAME");
		});

		it("converts PascalCase to UPPER_SNAKE_CASE", () => {
			expect(toUpperCase("UserId")).toBe("USER_ID");
			expect(toUpperCase("UserName")).toBe("USER_NAME");
		});

		it("converts snake_case to UPPER_SNAKE_CASE", () => {
			expect(toUpperCase("user_id")).toBe("USER_ID");
			expect(toUpperCase("user_name")).toBe("USER_NAME");
		});

		describe("acronym handling", () => {
			it("converts UPPER_CASE with acronyms to UPPER_SNAKE_CASE", () => {
				expect(toUpperCase("HTML_PARSER")).toBe("HTML_PARSER");
				expect(toUpperCase("API_KEY")).toBe("API_KEY");
			});

			it("converts PascalCase with acronyms to UPPER_SNAKE_CASE", () => {
				expect(toUpperCase("HTMLParser")).toBe("HTML_PARSER");
				expect(toUpperCase("XMLHttpRequest")).toBe("XML_HTTP_REQUEST");
			});

			it("converts camelCase with acronyms to UPPER_SNAKE_CASE", () => {
				expect(toUpperCase("getAPIResponse")).toBe("GET_API_RESPONSE");
				expect(toUpperCase("parseHTML")).toBe("PARSE_HTML");
			});
		});
	});

	describe("object conversion", () => {
		it("converts object keys to UPPER_SNAKE_CASE", () => {
			const input = { userId: 1, userName: "John" };
			const result = toUpperCase(input);
			expect(result).toEqual({ USER_ID: 1, USER_NAME: "John" });
		});

		it("converts nested objects", () => {
			const input = { userInfo: { userName: "John" } };
			const result = toUpperCase(input);
			expect(result).toEqual({ USER_INFO: { USER_NAME: "John" } });
		});

		it("converts nested arrays", () => {
			const input = [{ userName: "John" }, { userName: "Jane" }];
			const result = toUpperCase(input);
			expect(result).toEqual([{ USER_NAME: "John" }, { USER_NAME: "Jane" }]);
		});
	});

	it("returns non-string and non-object values as-is", () => {
		// @ts-expect-error testing runtime behavior with invalid input
		expect(toUpperCase(123)).toBe(123);
		// @ts-expect-error testing runtime behavior with invalid input
		expect(toUpperCase(null)).toBe(null);
		// @ts-expect-error testing runtime behavior with invalid input
		expect(toUpperCase(undefined)).toBe(undefined);
	});
});
