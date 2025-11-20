import { describe, it, expect } from "bun:test";
import { toKebabCase } from "../../src/core/toKebabCase";

describe("toKebabCase", () => {
  describe("string conversion", () => {
    it("converts camelCase to kebab-case", () => {
      expect(toKebabCase("userId")).toBe("user-id");
      expect(toKebabCase("userName")).toBe("user-name");  
    });

    it("converts PascalCase to kebab-case", () => {
      expect(toKebabCase("UserId")).toBe("user-id");
      expect(toKebabCase("UserName")).toBe("user-name");
    });

    it("converts snake_case to kebab-case", () => {
      expect(toKebabCase("user_id")).toBe("user-id");
      expect(toKebabCase("user_name")).toBe("user-name");
    });
  });

  describe("object conversion", () => {
    it("converts object keys to kebab-case", () => {
      const input = { userId: 1, userName: "John" };
      const result = toKebabCase(input);
      expect(result).toEqual({ "user-id": 1, "user-name": "John" });
    });

    it("converts nested objects", () => {
      const input = { userInfo: { userName: "John" } };
      const result = toKebabCase(input);
      expect(result).toEqual({ "user-info": { "user-name": "John" } });
    });
  });
});