import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.ts"],
        languageOptions: { globals: globals.browser },
    },
    tseslint.configs.recommended,
], {
    ignores: ["**/*.js", "**/*.mjs"],
});