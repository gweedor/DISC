import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // DISC style accent colors (kept calm/professional, not garish)
        disc: {
          d: '#dc2626', // red  - Direct / Decisive
          i: '#f59e0b', // amber - Influencing / Social
          s: '#16a34a', // green - Steady / Supportive
          c: '#2563eb', // blue  - Careful / Conscientious
        },
      },
    },
  },
  plugins: [],
};

export default config;
