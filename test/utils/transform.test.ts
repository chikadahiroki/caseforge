import { describe, it, expect } from "bun:test";
import { transformObject } from "../../src/utils/transform";

describe("transformObject", () => {
	const upperCaseKey = (key: string) => key.toUpperCase();

	it("transforms object keys", () => {
		const input = { userId: "1", userName: "John" };
		const result = transformObject(input, upperCaseKey);
		expect(result).toEqual({ USERID: "1", USERNAME: "John" });
	});

	it("transforms nested objects", () => {
		const input = { user: { userId: "1", userName: "John" } };
		const result = transformObject(input, upperCaseKey);
		expect(result).toEqual({ USER: { USERID: "1", USERNAME: "John" } });
	});

	it("transforms arrays of objects", () => {
		const input = { users: [{ userId: "1", userName: "John" }, { userId: "2", userName: "Jane" }] };
		const result = transformObject(input, upperCaseKey);
		expect(result).toEqual({ USERS: [{ USERID: "1", USERNAME: "John" }, { USERID: "2", USERNAME: "Jane" }] });
	});

	it("preserves primitive values", () => {
		const input = { userId: "1", userName: "John", age: 30, active: true };
		const result = transformObject(input, upperCaseKey);
		expect(result).toEqual({ USERID: "1", USERNAME: "John", AGE: 30, ACTIVE: true });
	});

	it("preserves built-in objects", () => {
		const date = new Date();
		const regex = /user/;
		const func = () => {};
		const input = { date, regex, func };
		const result = transformObject(input, upperCaseKey);
		expect(result).toEqual({ DATE: date, REGEX: regex, FUNC: func });
	});

	it("handles null and undefined", () => {
		const input = { nullValue: null, undefinedValue: undefined };
		const result = transformObject(input, upperCaseKey);
		expect(result).toEqual({ NULLVALUE: null, UNDEFINEDVALUE: undefined });
	});
});