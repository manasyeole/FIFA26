import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "*.config.*",
    "commitlint.config.cjs",
  ]),

  {
    rules: {
      // Enforce consistent imports
      "import/order": "off", // handled by prettier-plugin-imports if added later

      // React
      "react/self-closing-comp": "warn",
      "react/jsx-no-useless-fragment": "warn",

      // TypeScript — disable any usage
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],

      // General quality
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
    },
  },
]);

export default eslintConfig;
