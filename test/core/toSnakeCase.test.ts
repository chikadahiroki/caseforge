import { describe, expect, it } from "bun:test";
import { toSnakeCase } from "../../src/core/toSnakeCase";

describe("toSnakeCase", () => {
	describe("string conversion", () => {
		it("converts camelCase to snake_case", () => {
			expect(toSnakeCase("userId")).toBe("user_id");
			expect(toSnakeCase("userName")).toBe("user_name");
		});

		it("converts PascalCase to snake_case", () => {
			expect(toSnakeCase("UserId")).toBe("user_id");
			expect(toSnakeCase("UserName")).toBe("user_name");
		});

		it("converts kebab-case to snake_case", () => {
			expect(toSnakeCase("user-id")).toBe("user_id");
			expect(toSnakeCase("user-name")).toBe("user_name");
		});

		describe("acronym handling", () => {
			it("converts UPPER_CASE with acronyms to snake_case", () => {
				expect(toSnakeCase("HTML_PARSER")).toBe("html_parser");
				expect(toSnakeCase("API_KEY")).toBe("api_key");
			});

			it("converts PascalCase with acronyms to snake_case", () => {
				expect(toSnakeCase("HTMLParser")).toBe("html_parser");
				expect(toSnakeCase("XMLHttpRequest")).toBe("xml_http_request");
			});

			it("converts camelCase with acronyms to snake_case", () => {
				expect(toSnakeCase("getAPIResponse")).toBe("get_api_response");
				expect(toSnakeCase("parseHTML")).toBe("parse_html");
			});
		});
	});

	describe("object conversion", () => {
		it("converts object keys to snake_case", () => {
			const input = { userId: 1, userName: "John" };
			const result = toSnakeCase(input);
			expect(result).toEqual({ user_id: 1, user_name: "John" });
		});

		it("converts nested objects", () => {
			const input = { userInfo: { userName: "John" } };
			const result = toSnakeCase(input);
			expect(result).toEqual({ user_info: { user_name: "John" } });
		});

		it("converts nested arrays", () => {
			const input = [{ userName: "John" }, { userName: "Jane" }];
			const result = toSnakeCase(input);
			expect(result).toEqual([{ user_name: "John" }, { user_name: "Jane" }]);
		});
	});

	it("returns non-string and non-object values as-is", () => {
		// @ts-expect-error testing runtime behavior with invalid input
		expect(toSnakeCase(123)).toBe(123);
		// @ts-expect-error testing runtime behavior with invalid input
		expect(toSnakeCase(null)).toBe(null);
		// @ts-expect-error testing runtime behavior with invalid input
		expect(toSnakeCase(undefined)).toBe(undefined);
	});
});
