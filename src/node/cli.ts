import cac from 'cac';
import { createDevServer } from './dev';
import * as path from 'path';


const version = require('../../package.json').version;

const cli = cac('island').version('0.0.1').help();

cli
  .command('[root]', 'start dev server')
  .alias('dev')
  .action(async (root: string) => {
    root = root ? path.resolve(root) : process.cwd();
    const server = await createDevServer(root);
    await server.listen();
    server.printUrls();
  });

cli
  .command('build [root]', 'build for production')
  .action(async (root: string) => {
    console.log('build', root);
  });

cli.parse();
