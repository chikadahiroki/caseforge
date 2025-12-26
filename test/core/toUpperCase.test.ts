import { describe, it, expect } from "bun:test";
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
  });
});