import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://rockie-9.github.io',
  base: '/gps-content-promotion',
  integrations: [mdx()],
  build: {
    format: 'directory',
  },
  trailingSlash: 'always',
});
