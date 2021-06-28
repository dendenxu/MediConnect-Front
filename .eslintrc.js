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
    'react/prop-types': 'off',
    'react/jsx-key': 'off',
    'no-unused-vars': 'off',
    'no-useless-escape': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-lonely-if': 'off',
    'no-else-return': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-irregular-whitespace': 'off',
    'react/destructuring-assignment': 'off',
  },
};
