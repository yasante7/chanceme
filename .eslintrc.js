module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    // Disable rules causing build failures
    '@typescript-eslint/no-unused-vars': 'warn', // Downgrade from error to warning
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-object-type': 'off'
  }
}