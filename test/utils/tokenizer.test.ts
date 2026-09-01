import { describe, expect, it } from "bun:test";
import { splitWords } from "../../src/utils/tokenizer";

describe("tokenizer", () => {
	describe("splitWords", () => {
		it("splits snake_case", () => {
			expect(splitWords("user_name")).toEqual(["user", "name"]);
		});

		it("splits kebab-case", () => {
			expect(splitWords("user-name")).toEqual(["user", "name"]);
		});

		it("splits camelCase", () => {
			expect(splitWords("userName")).toEqual(["user", "name"]);
		});

		it("splits PascalCase", () => {
			expect(splitWords("UserName")).toEqual(["user", "name"]);
		});

		it("splits acronyms in PascalCase", () => {
			expect(splitWords("HTMLParser")).toEqual(["html", "parser"]);
			expect(splitWords("XMLHttpRequest")).toEqual(["xml", "http", "request"]);
		});

		it("splits acronyms in camelCase", () => {
			expect(splitWords("getAPIResponse")).toEqual(["get", "api", "response"]);
			expect(splitWords("parseHTML")).toEqual(["parse", "html"]);
		});

		it("splits UPPER_CASE", () => {
			expect(splitWords("HTML_PARSER")).toEqual(["html", "parser"]);
		});
	});
});
