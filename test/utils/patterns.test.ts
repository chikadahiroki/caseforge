import { describe, expect, it } from "bun:test";
import { PATTERNS } from "../../src/utils/patterns";

describe("patterns", () => {
	describe("WORDS", () => {
		it("matches words including acronyms", () => {
			expect("HTMLParser".match(PATTERNS.WORDS)).toEqual(["HTML", "Parser"]);
			expect("getAPIResponse".match(PATTERNS.WORDS)).toEqual([
				"get",
				"API",
				"Response",
			]);
			expect("HTML_PARSER".match(PATTERNS.WORDS)).toEqual(["HTML", "PARSER"]);
		});
	});

	describe("CAMEL_CASE", () => {
		it("matches camelCase strings", () => {
			expect(PATTERNS.CAMEL_CASE.test("userName")).toBe(true);
			expect(PATTERNS.CAMEL_CASE.test("UserName")).toBe(false);
		});
	});

	describe("KEBAB_CASE", () => {
		it("matches kebab-case strings", () => {
			expect(PATTERNS.KEBAB_CASE.test("user-name")).toBe(true);
			expect(PATTERNS.KEBAB_CASE.test("user_name")).toBe(false);
		});
	});

	describe("PASCAL_CASE", () => {
		it("matches PascalCase strings", () => {
			expect(PATTERNS.PASCAL_CASE.test("UserName")).toBe(true);
			expect(PATTERNS.PASCAL_CASE.test("userName")).toBe(false);
		});
	});

	describe("SNAKE_CASE", () => {
		it("matches snake_case strings", () => {
			expect(PATTERNS.SNAKE_CASE.test("user_name")).toBe(true);
			expect(PATTERNS.SNAKE_CASE.test("userName")).toBe(false);
		});
	});

	describe("UPPER_CASE", () => {
		it("matches UPPER_CASE strings", () => {
			expect(PATTERNS.UPPER_CASE.test("USER_NAME")).toBe(true);
			expect(PATTERNS.UPPER_CASE.test("user_name")).toBe(false);
		});
	});
});
