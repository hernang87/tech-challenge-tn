module.exports = {
  env: {
    commonjs: true,
    node: true,
    "jest/globals": true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    "max-len": ["error", { code: 80 }],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "sort-keys": ["error", "asc", { natural: true }],
  },
};
