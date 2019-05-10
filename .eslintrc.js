module.exports =  {
    parser:  "@typescript-eslint/parser",  // Specifies the ESLint parser
    extends:  [
      "plugin:@typescript-eslint/recommended",  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
      "prettier/@typescript-eslint",  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    ],
    parserOptions:  {
      ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
      sourceType:  "module",  // Allows for the use of imports
    },
    rules: {
        "key-spacing": ["error", {
            "beforeColon": false,
            "afterColon": true,
            "mode": "strict"
        }],
        "block-spacing": ["error", "always"],
        "space-before-blocks": ["error", "always"],
        "keyword-spacing": ["error", {
            "before": true,
            "after": true
        }],
        "no-trailing-spaces": ["error"],
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
        "@typescript-eslint/no-var-requires": false,
        "@typescript-eslint/interface-name-prefix": "always",
        "@typescript-eslint/explicit-function-return-type": ["warn", {
            "allowExpressions": true,
            "allowTypedFunctionExpressions": false
        }],
        "@typescript-eslint/explicit-member-accessibility": ["error", {
            accessibility: "explicit",
            overrides: {
                constructors: "off"
            }
        }],
        "@typescript-eslint/no-parameter-properties": ["error", {
            "allows": ["public", "private"]
        }]
    }
  };
