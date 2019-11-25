module.exports =  {
    "parser":  "@typescript-eslint/parser",  // Specifies the ESLint parser
    "extends":  [
      "plugin:@typescript-eslint/recommended",  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
      "prettier/@typescript-eslint",  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    ],
    "parserOptions":  {
      "ecmaVersion":  2018,  // Allows for the parsing of modern ECMAScript features
      "sourceType":  "module",  // Allows for the use of imports
    },
    "rules": {
        "arrow-spacing": "error",
        "arrow-parens": ["error", "as-needed"],
        "comma-dangle": ["error", "only-multiline"],
        "block-spacing": ["error", "always"],
        "func-call-spacing": ["error", "never"],
        "key-spacing": ["error", {
            "beforeColon": false,
            "afterColon": true,
            "mode": "strict"
        }],
        "keyword-spacing": ["error", {
            "before": true,
            "after": true
        }],
        "indent": ["error", 4],
        "no-const-assign": "error",
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
        "no-trailing-spaces": ["error"],
        "no-var": "error",
        "quotes": ["error", "single"],
        "quote-props": ["error", "as-needed"],
        "space-before-blocks": "error",
        "space-before-function-paren": ["error", "never"],
        "camelcase": "off",
        "@typescript-eslint/camelcase": ["error", { "properties": "always" }],
        '@typescript-eslint/member-delimiter-style': 'error',
        "@typescript-eslint/no-explicit-any": false,
        "@typescript-eslint/no-var-requires": false,
        "@typescript-eslint/interface-name-prefix": "always",
        "@typescript-eslint/explicit-function-return-type": ["warn", {
            "allowExpressions": true,
            "allowTypedFunctionExpressions": false
        }],
        "@typescript-eslint/explicit-member-accessibility": ["error", {
            "accessibility": "explicit",
            "overrides": {
                "constructors": "off"
            }
        }],
        "@typescript-eslint/no-parameter-properties": ["error", {
            "allows": ["public", "private"]
        }]
    }
};
