module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "prettier"],
  rules: {
    "react/prop-types": "warn", // Show warning for missing prop-types
    "prettier/prettier": "error", // Enforce prettier formatting
    "react/jsx-indent": ["error", 2], // Enforce 2 spaces for indentation in JSX
    "react/jsx-max-props-per-line": ["error", { maximum: 1, when: "always" }], // Enforce a max of 1 prop per line
    "no-console": "warn", // Show warning for console logs
    "no-unused-vars": "warn", // Show warning for unused variables
    semi: ["error", "always"], // Enforce semicolons at the end of statements
    quotes: ["error", "single"], // Enforce single quotes
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the React version
    },
  },
};
