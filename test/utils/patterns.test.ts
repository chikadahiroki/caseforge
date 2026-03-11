import { describe, expect, it } from "bun:test";
import { PATTERNS } from "../../src/utils/patterns";

describe("patterns", () => {
	describe("LEADING_UPPER", () => {
		it("matches leading uppercase letters", () => {
			expect(PATTERNS.LEADING_UPPER.test("User")).toBe(true);
			expect(PATTERNS.LEADING_UPPER.test("user")).toBe(false);
		});
	});

	describe("UPPER_CHAR", () => {
		it("matches all uppercase characters", () => {
			expect(PATTERNS.UPPER_CHAR.test("userName")).toBe(true);
			expect(PATTERNS.UPPER_CHAR.test("username")).toBe(false);
		});
	});

	describe("LEADING_LOWER", () => {
		it("matches leading lowercase letters", () => {
			expect(PATTERNS.LEADING_LOWER.test("user")).toBe(true);
			expect(PATTERNS.LEADING_LOWER.test("User")).toBe(false);
		});
	});

	describe("SEPARATOR_WITH_CHAR", () => {
		it("matches separators with following character", () => {
			expect(PATTERNS.SEPARATOR_WITH_CHAR.test("user_name")).toBe(true);
			expect(PATTERNS.SEPARATOR_WITH_CHAR.test("username")).toBe(false);
		});
	});

	describe("EDGE_SEPARATORS", () => {
		it("matches leading and trailing separators", () => {
			expect(PATTERNS.EDGE_SEPARATORS.test("_user")).toBe(true);
			expect(PATTERNS.EDGE_SEPARATORS.test("user")).toBe(false);
		});
	});

	describe("CONSECUTIVE_SEPARATORS", () => {
		it("matches consecutive separators", () => {
			expect(PATTERNS.CONSECUTIVE_SEPARATORS.test("user__name")).toBe(true);
			expect(PATTERNS.CONSECUTIVE_SEPARATORS.test("username")).toBe(false);
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
