module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
	'linebreak-style': 0,
	'indent': 'off',
	'no-tabs': 0,
	'import/no-named-as-default': 0,
	"react/jsx-indent": 'off',
	"react/jsx-indent-props": 'off',
  },
};
