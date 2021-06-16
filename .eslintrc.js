module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-console': 'off',
    strict: ['error', 'global'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'react/prop-types': 'warn',
    'react/jsx-key': 'warn',
    'no-unused-vars': 'warn',
    'no-useless-escape': 'warn',
    'jsx-a11y/anchor-is-valid': 'warn',
    'no-lonely-if': 'warn',
    'no-else-return': 'warn',
    'react/jsx-props-no-spreading': 'warn',
    'no-irregular-whitespace': 'warn',
  },
};
