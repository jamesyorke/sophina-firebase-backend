import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import _import from "eslint-plugin-import";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "lib/**/*",
        "generated/**/*",
        "eslint.config.mjs", // 🚀 Ignore ESLint config file
        "functions/lib/**/*", // 🚀 Ignore built files
    ],
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
)), {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        import: fixupPluginRules(_import),
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: ["./tsconfig.json", "./tsconfig.dev.json"],
        },
    },

    rules: {
        indent: ["error", 4],

        quotes: ["error", "single", {
            avoidEscape: true,
        }],

        semi: ["error", "always"],
        "no-console": "warn",
        "no-debugger": "warn",

        "no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
        }],

        eqeqeq: ["error", "smart"],
        curly: ["error", "all"],

        "brace-style": ["error", "1tbs", {
            allowSingleLine: true,
        }],
        
        "arrow-parens": ["error", "always"],

        "max-len": ["warn", {
            code: 120,
            ignoreComments: true,
        }],

        "no-magic-numbers": "off",
        "space-before-blocks": ["error", "always"],
        "object-curly-spacing": ["error", "always"],
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "import/no-unresolved": "off",
        "require-jsdoc": "off",
        "valid-jsdoc": "off",
    },
}];