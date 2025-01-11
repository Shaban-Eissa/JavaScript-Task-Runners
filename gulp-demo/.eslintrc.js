module.exports = {
    env: {
      browser: true,
      es2020: true, // Use es2020 if es2021 is not supported
      node: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
      ecmaVersion: 11, // Use a valid ECMAScript version
      sourceType: 'module',
    },
    rules: {
      // Add custom rules here
    },
  };