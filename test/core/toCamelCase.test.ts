import { describe, it, expect } from "bun:test";
import { toCamelCase } from "../../src/core/toCamelCase";

describe("toCamelCase", () => {
  describe("string conversion", () => {
    it("converts snake_case to camelCase", () => {
      expect(toCamelCase("user_id")).toBe("userId");
      expect(toCamelCase("user_name")).toBe("userName");
    });

    it("converts kebab-case to camelCase", () => {
      expect(toCamelCase("user-id")).toBe("userId");
      expect(toCamelCase("user-name")).toBe("userName");
    });

    it("converts PascalCase to camelCase", () => {
      expect(toCamelCase("UserId")).toBe("userId");
      expect(toCamelCase("UserName")).toBe("userName");
    });
  });

  describe("object conversion", () => {
    it("converts object keys to camelCase", () => {
      const input = { user_id: 1, user_name: "John" };
      const result = toCamelCase(input);
      expect(result).toEqual({ userId: 1, userName: "John" });
    });

    it("converts nested objects", () => {
      const input = { user_info: { user_name: "John" } };
      const result = toCamelCase(input);
      expect(result).toEqual({ userInfo: { userName: "John" } });
    });
  });
});