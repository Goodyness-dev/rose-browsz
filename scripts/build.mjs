// Load this ESM config directly so Windows dependency junctions do not require
// esbuild to traverse protected parent directories just to bundle the config.
import { build } from 'vite';
import config from '../vite.config.js';
await build({ ...config, configFile: false });
