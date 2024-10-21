import { Recipe, RecipeType } from "./recipe";
import { Store } from "./stores/store.type";

export async function list(store: Store<RecipeType[]>, args: string[]) {
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const formatted = recipes
    .map((recipe) => `- [${recipe.id}] ${recipe.name}`)
    .join('\n');
  console.log('Your recipes:');
  console.log(formatted);
}

export async function details(store: Store<RecipeType[]>, args: string[]) {
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();

  if (args.length !== 1) {
    console.error('Error: The details command requires exactly one argument, the recipe ID.');
    return;
  }

  const id = Number(args[0]);

  if (!Number(id)) {
    console.error('Error: Recipe ID must be a numeric value.');
  } else if(!recipes[id]) {
    console.error(`Error: Recipe with ID ${id} not found.`);
  }

  const searchedRecipe = recipes[id];

  console.log(`ID: ${searchedRecipe.id}`);
  console.log(`Name: ${searchedRecipe.name}`);
}