module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    overrides: [
      {
        env: {
          node: true,
        },
        files: ['.eslintrc.{js,cjs}'],
        parserOptions: {
          sourceType: 'script',
        },
      },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint'],
    rules: {},
    extends: ['airbnb-typescript'],
  };
  