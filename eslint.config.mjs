import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from 'eslint-plugin-prettier'

const eslintConfig = defineConfig([
    ...nextVitals,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: { prettier: prettierPlugin },
        rules: {
            'prettier/prettier': 'error',
        },
    },
    eslintConfigPrettier,
    globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts',
        'node_modules/**',
        'dist/**',
    ]),
]);

export default eslintConfig;
