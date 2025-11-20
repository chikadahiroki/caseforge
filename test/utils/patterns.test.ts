import { describe, it, expect } from "bun:test";
import { PATTERNS } from "../../src/utils/patterns";

describe("patterns", () => {
	describe("LEADING_UPPER", () => {
		it("matches leading uppercase letters", () => {
			expect(PATTERNS.LEADING_UPPER.test("User")).toBe(true);
			expect(PATTERNS.LEADING_UPPER.test("user")).toBe(false);
		});
	});

	describe("UPPERCASE", () => {
		it("matches all uppercase letters", () => {
			const result = "userName".match(PATTERNS.UPPERCASE);
			expect(result).toEqual(["N"]);
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
			const result = "user_name".replace(PATTERNS.SEPARATOR_WITH_CHAR, (_, c) => c.toUpperCase());
			expect(result).toBe("userName");
		});
	});

	describe("EDGE_SEPARATORS", () => {
		it("matches leading and trailing separators", () => {
			expect("_user_".replace(PATTERNS.EDGE_SEPARATORS, "")).toBe("user");
		});
	});

	describe("CONSECUTIVE_SEPARATORS", () => {
		it("matches consecutive separators", () => {
			expect("user__name".replace(PATTERNS.CONSECUTIVE_SEPARATORS, "_")).toBe("user_name");
		});
	});
});