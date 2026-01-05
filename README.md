# caseforge

[![npm version](https://badge.fury.io/js/caseforge.svg)](https://www.npmjs.com/package/caseforge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Type-safe and lightweight case conversion library for TypeScript.

## Features

- 🎯 Type-safe conversions with full TypeScript support
- 🪶 Zero dependencies
- 🔄 Supports camelCase, snake_case, kebab-case, PascalCase, and UPPER_CASE
- 🔍 Case format detection functions
- 🌳 Deep object and array transformation
- 📦 Works with Bun, Node.js, and browsers

## Installation

```bash
npm install caseforge
```

```ts
import { 
  toCamelCase, 
  toSnakeCase, 
  toKebabCase, 
  toPascalCase, 
  toUpperCase,
  isCamelCase,
  isSnakeCase,
  isKebabCase,
  isPascalCase,
  isUpperCase
} from "caseforge";

// String conversion
toCamelCase("user_name");     // => "userName"
toSnakeCase("userName");       // => "user_name"
toKebabCase("userName");       // => "user-name"
toPascalCase("user_name");     // => "UserName"
toUpperCase("userName");       // => "USER_NAME"

// Case format detection
isCamelCase("userName");       // => true
isSnakeCase("user_name");      // => true
isKebabCase("user-name");      // => true
isPascalCase("UserName");      // => true
isUpperCase("USER_NAME");      // => true

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
// result.userSettings.notificationEnabled (typed!)

// Detect API response format and convert accordingly
const sampleKey = Object.keys(apiResponse)[0];
if (isSnakeCase(sampleKey)) {
  const converted = toCamelCase(apiResponse);
  // Use converted data
}
```

## API

### Conversion Functions

- `toCamelCase(input)` - Converts to camelCase
- `toSnakeCase(input)` - Converts to snake_case
- `toKebabCase(input)` - Converts to kebab-case
- `toPascalCase(input)` - Converts to PascalCase
- `toUpperCase(input)` - Converts to UPPER_SNAKE_CASE

### Detection Functions

- `isCamelCase(value)` - Checks if a string is in camelCase format
- `isSnakeCase(value)` - Checks if a string is in snake_case format
- `isKebabCase(value)` - Checks if a string is in kebab-case format
- `isPascalCase(value)` - Checks if a string is in PascalCase format
- `isUpperCase(value)` - Checks if a string is in UPPER_SNAKE_CASE format

## License

MIT © Chikada Hiroki