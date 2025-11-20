# case-convert

[![CI](https://github.com/YOUR_USERNAME/case-convert/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/case-convert/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/case-convert.svg)](https://www.npmjs.com/package/case-convert)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Type-safe and lightweight case conversion library for TypeScript.

## Features

- 🎯 Type-safe conversions with full TypeScript support
- 🪶 Zero dependencies
- 🔄 Supports camelCase, snake_case, kebab-case, and PascalCase
- 🌳 Deep object and array transformation
- 📦 Works with Bun, Node.js, and browsers

## Installation

```bash
npm install case-convert
```

```ts
import { toCamelCase, toSnakeCase, toKebabCase, toPascalCase } from "case-convert";

// String conversion
toCamelCase("user_name");     // => "userName"
toSnakeCase("userName");       // => "user_name"
toKebabCase("userName");       // => "user-name"
toPascalCase("user_name");     // => "UserName"

// Object conversion with type inference
const apiResponse = {
  user_id: 123,
  user_name: "John",
  user_settings: {
    notification_enabled: true
  }
};

const result = toCamelCase(apiResponse);
// result.userId (typed!)
// result.userName (typed!)
// result.userSettings.notificationEnabled (typed!)## API

```

## License

MIT © Chikada Hiroki