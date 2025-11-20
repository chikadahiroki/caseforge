import { describe, it, expect } from "bun:test";
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
  });
});