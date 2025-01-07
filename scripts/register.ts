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