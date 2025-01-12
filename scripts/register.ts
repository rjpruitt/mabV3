/**
 * TypeScript Runtime Configuration
 * 
 * This file configures ts-node to enable:
 * - Direct execution of TypeScript files
 * - ES modules support
 * - Proper module resolution
 * 
 * Required by npm scripts:
 * ```json
 * "scripts": {
 *   "test-scraper-[category]": "NODE_OPTIONS=--experimental-loader=ts-node/esm node scripts/test-scraper-[category].ts"
 * }
 * ```
 */

const { register } = require('ts-node')
const { join } = require('path')

register({
  project: join(process.cwd(), 'tsconfig.json'),
  transpileOnly: true,
  compilerOptions: {
    module: 'ESNext',
    moduleResolution: 'Node'
  }
}) 