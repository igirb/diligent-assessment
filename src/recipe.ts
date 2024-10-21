import { Store } from "./stores/store.type"

export type RecipeType = {
  id: number
  name: string
  readonly difficulty: 'easy' | 'medium' | 'hard'
}

export class Recipe {
  private store;

  constructor(store: Store<RecipeType[]>) {
    this.store = store;
  }

  async readAll() {
    return await this.store.getValue();
  }
}


