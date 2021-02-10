module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended"
    ],
    parserOptions: {
        ecmaFeatures: {
            "jsx": true
        },
        ecmaVersion: 11,
        sourceType: "module"
    },
    rules: {
        'prettier/prettier': 'warn'
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
}
