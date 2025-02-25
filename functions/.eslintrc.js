module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '/generated/**/*', // Ignore generated files.
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'indent': ['error', 2], // Enforces 2 spaces for indentation, can be changed to 4 if needed
    'quotes': ['error', 'single', { 'avoidEscape': true }], // Enforces single quotes unless double is required
    'semi': ['error', 'always'], // Requires semicolons at the end of statements
    'no-console': 'warn', // Allows console logs but warns about them
    'no-debugger': 'warn', // Allows debugger but warns about it
    'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], // Warns on unused variables but allows unused function arguments prefixed with _
    'eqeqeq': ['error', 'smart'], // Enforces strict equality (===) but allows for loose equality with null (== null)
    'curly': ['error', 'all'], // Enforces curly braces around all control statements (if, for, etc.)
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }], // Enforces one true brace style, allows single-line blocks
    'arrow-parens': ['error', 'always'], // Requires parentheses around arrow function parameters
    'max-len': ['warn', {
      'code': 120,
      'ignoreComments': true,
    }], // Warns if line length exceeds 120 characters
    'no-magic-numbers': 'off', // Disabled since this is an eslint config file where numbers are configuration values
    'space-before-blocks': ['error', 'always'], // Requires space before blocks
    'object-curly-spacing': ['error', 'always'], // Enforces spaces inside curly braces in objects
    '@typescript-eslint/no-explicit-any': 'warn', // Warns about using 'any' type in TypeScript
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disables requiring types for exported functions
    'import/no-unresolved': 'off', // Allow imports without resolution
  },
};
