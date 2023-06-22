import { ContainerBuilder } from 'node-dependency-injection';

class DiContainer {
  private static container: ContainerBuilder;

  private constructor() {
    DiContainer.container = new ContainerBuilder();
  }

  static getContainer(): ContainerBuilder {
    if (!DiContainer.container) {
      new DiContainer();
    }
    return this.container;
  }
}
const diContainer: ContainerBuilder = DiContainer.getContainer();
export { diContainer };