module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: false,
    },
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  rules: {
    // Additional rules can be added here
  },
  settings: {
    "import/resolver": {
      typescript: {}, // This loads the TypeScript plugin for ESLint
    },
  },
  overrides: [
    {
      files: ["src/**/*.ts"],
    },
  ],
};
