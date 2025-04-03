module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "react-app",
    "prettier"
  ],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    "prettier/prettier": "off",
    "react/prop-types": "warn",
    "no-unused-vars": "warn",
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
  },
}; 