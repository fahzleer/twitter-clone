module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    env: {
        node: true,
        browser: true,
        es6: true,
        commonjs: true,
    },
    extends: ['prettier', 'next/core-web-vitals'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        // Conflict with @typescript-eslint
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        'default-case': 'off',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: ['enum', 'enumMember'],
                format: ['PascalCase'],
            },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'react/default-props-match-prop-types': [
            'error',
            { allowRequiredDefaults: true },
        ],
        'react/jsx-sort-props': 'error',
        'no-param-reassign': 'error',
        'no-plusplus': 'off',
        eqeqeq: 'error',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'import/prefer-default-export': 'off',
        'no-console': 'warn',
        'no-nested-ternary': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-expressions': ['error', { allowTernary: true }],
        camelcase: 'off',
        'react/self-closing-comp': 'warn',
        'react/jsx-filename-extension': [
            'warn',
            { extensions: ['.jsx', '.tsx'] },
        ],
        'react/prop-types': 'off',
        'react/destructuring-assignment': 'off',
        'react/jsx-no-comment-textnodes': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/no-array-index-key': 'off',
        'react/no-unescaped-entities': 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'linebreak-style': ['error', 'unix'],
        semi: ['error', 'never'],
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'import/no-unused-modules': [
            'error',
            {
                unusedExports: true,
                ignoreExports: ['**/pages/**/*.tsx'],
            },
        ],
        'import/named': 'off',
        'import/no-named-as-default': 'off',
        'import/no-anonymous-default-export': 'off',
    },
}
