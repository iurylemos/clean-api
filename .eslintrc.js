module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    '@typescript-eslint/no-redeclare': 'off',
    'no-redeclare': 'off'
  }
}
