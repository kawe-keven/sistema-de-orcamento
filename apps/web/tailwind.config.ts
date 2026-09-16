import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#17221d', paper: '#fff', canvas: '#f6f8f4', mint: '#b9e8cf', coral: '#d86655' }, fontFamily: { sans: ['ui-sans-serif', 'system-ui'] } } }, plugins: [] } satisfies Config;
