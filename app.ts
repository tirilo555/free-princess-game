// @ts-ignore
import * as configuration from './package.json';
import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';
import { diContainer } from './src/di-container';

console.log(`Hello, this is Coursework, author: ${configuration.author}`);

(async () => {
  let container: ContainerBuilder = diContainer;
  let loader: YamlFileLoader = new YamlFileLoader(container);
  await loader.load(`${__dirname}/serviceconfig.yaml`);
  void container.get('Game').start();
})();





