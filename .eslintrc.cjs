module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.eslint.json',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        '@typescript-eslint/lines-between-class-members': ['error', 'always', { exceptAfterOverload: true, exceptAfterSingleLine: true }],
        '@typescript-eslint/no-floating-promises': 'error',
        'no-console': 'error',
        'no-inline-comments': 'error',
        'no-warning-comments': ['warn', { terms: ['@todo', 'todo', 'fixme'], location: 'start' }],
        'react/react-in-jsx-scope': 'off',
        'spaced-comment': 'error',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    ignorePatterns: ['.eslintrc.cjs', 'vite-env.d.ts'],
};
