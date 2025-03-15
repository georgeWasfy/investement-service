export class ModelMapper<M, T> {
  private readonly modelToTypeMapping: (model: M) => T;
  private model: M;
  private models: M[];

  constructor(modelToTypeMapping: (model: M) => T) {
    this.modelToTypeMapping = modelToTypeMapping;
  }

  setModel(model: M): void {
    this.model = model;
  }

  setModels(models: M[]): void {
    this.models = models;
  }

  mapModelToType(): T {
    if (!this.model) {
      throw new Error('Model must be set before mapping');
    }
    return this.modelToTypeMapping(this.model);
  }

  mapModelsToTypes(): T[] {
    if (!this.models) {
      throw new Error('Models must be set before mapping');
    }
    return this.models.map(this.modelToTypeMapping);
  }
}
