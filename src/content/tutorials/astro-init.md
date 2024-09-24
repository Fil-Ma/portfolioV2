# Initialize an astro project with TypeScript and Tailwind

First step - initialize the project

`npm create astro@latest`

Second step - add Tailwind

`npx astro add tailwind`

Add the Tailwind directives to your CSS (src/styles/input.css)

```typescript
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Generate the output file

`npx tailwindcss -i ./src/styles/input.css -o ./src/styles/output.css --watch`

Third step - add linters and plugins

`npm i -D @typescript-eslint/parser eslint eslint-plugin-astro prettier prettier-plugin-astro prettier-plugin-tailwindcss`

Fourth step - add preact

`npx astro add preact`

Configurations:

- Typescript aliases

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@styles/*": ["src/styles/*"],
      "@utils/*": ["src/utils/*"]
    },
    "jsx": "react-jsx",
    "jsxImportSource": "preact",
    "strictNullChecks": true
  }
}
```

- Prettier

Create the file `.prettierrc.mjs`

Add the config for astro

```mjs
/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
```

- Eslint

Create the file `eslint.config.js`

Add the config for astro

```js
import eslintPluginAstro from "eslint-plugin-astro";
export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
  },
];
```
