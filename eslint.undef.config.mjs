import react from 'eslint-plugin-react';
import globals from 'globals';
export default [{
  files: ['**/*.{js,jsx}'],
  plugins: { react },
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: { ecmaFeatures: { jsx: true } },
    globals: { ...globals.browser },
  },
  rules: { 'no-undef': 'error', 'react/jsx-no-undef': 'error', 'react/jsx-uses-vars': 'error' },
}];
