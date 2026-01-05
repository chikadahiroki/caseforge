import { describe, it, expect } from "bun:test";
import {
	isCamelCase,
	isSnakeCase,
	isKebabCase,
	isPascalCase,
	isUpperCase,
} from "../../src/utils/caseGuards";

describe("caseGuards", () => {
	describe("isCamelCase", () => {
		it("returns true for camelCase strings", () => {
			expect(isCamelCase("userName")).toBe(true);
			expect(isCamelCase("user")).toBe(true);
		});

		it("returns false for non-camelCase strings", () => {
			expect(isCamelCase("user_name")).toBe(false);
			expect(isCamelCase("user-name")).toBe(false);
			expect(isCamelCase("UserName")).toBe(false);
			expect(isCamelCase("USER_NAME")).toBe(false);
		});

		it("returns false for non-strings", () => {
			expect(isCamelCase(123)).toBe(false);
			expect(isCamelCase(null)).toBe(false);
			expect(isCamelCase({})).toBe(false);
		});
	});

	describe("isSnakeCase", () => {
		it("returns true for snake_case strings", () => {
			expect(isSnakeCase("user_name")).toBe(true);
			expect(isSnakeCase("user")).toBe(true);
		});

		it("returns false for non-snake_case strings", () => {
			expect(isSnakeCase("userName")).toBe(false);
			expect(isSnakeCase("user-name")).toBe(false);
			expect(isSnakeCase("UserName")).toBe(false);
			expect(isSnakeCase("USER_NAME")).toBe(false);
		});

		it("returns false for non-strings", () => {
			expect(isSnakeCase(123)).toBe(false);
			expect(isSnakeCase(null)).toBe(false);
			expect(isSnakeCase({})).toBe(false);
		});
	});

	describe("isKebabCase", () => {
		it("returns true for kebab-case strings", () => {
			expect(isKebabCase("user-name")).toBe(true);
			expect(isKebabCase("user")).toBe(true);
		});

		it("returns false for non-kebab-case strings", () => {
			expect(isKebabCase("userName")).toBe(false);
			expect(isKebabCase("user_name")).toBe(false);
			expect(isKebabCase("UserName")).toBe(false);
			expect(isKebabCase("USER_NAME")).toBe(false);
		});

		it("returns false for non-strings", () => {
			expect(isKebabCase(123)).toBe(false);
			expect(isKebabCase(null)).toBe(false);
			expect(isKebabCase({})).toBe(false);
		});
	});

	describe("isPascalCase", () => {
		it("returns true for PascalCase strings", () => {
			expect(isPascalCase("UserName")).toBe(true);
			expect(isPascalCase("User")).toBe(true);
		});

		it("returns false for non-PascalCase strings", () => {
			expect(isPascalCase("userName")).toBe(false);
			expect(isPascalCase("user_name")).toBe(false);
			expect(isPascalCase("user-name")).toBe(false);
			expect(isPascalCase("USER_NAME")).toBe(false);
		});

		it("returns false for non-strings", () => {
			expect(isPascalCase(123)).toBe(false);
			expect(isPascalCase(null)).toBe(false);
			expect(isPascalCase({})).toBe(false);
		});
	});

	describe("isUpperCase", () => {
		it("returns true for UPPER_SNAKE_CASE strings", () => {
			expect(isUpperCase("USER_NAME")).toBe(true);
			expect(isUpperCase("USER")).toBe(true);
		});

		it("returns false for non-UPPER_SNAKE_CASE strings", () => {
			expect(isUpperCase("userName")).toBe(false);
			expect(isUpperCase("user_name")).toBe(false);
			expect(isUpperCase("user-name")).toBe(false);
			expect(isUpperCase("UserName")).toBe(false);
		});

		it("returns false for non-strings", () => {
			expect(isUpperCase(123)).toBe(false);
			expect(isUpperCase(null)).toBe(false);
			expect(isUpperCase({})).toBe(false);
		});
	});
});