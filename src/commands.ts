import { Recipe, RecipeType } from "./recipe";
import { Store } from "./stores/store.type";
import { AppError } from './app.error';

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
    throw new AppError('Error: The details command requires exactly one argument, the recipe ID.');
  }

  const id = Number(args[0]);

  if (!Number(id)) {
    throw new AppError('Error: Recipe ID must be a numeric value.');
  } else if(!recipes[id]) {
    throw new AppError(`Error: Recipe with ID ${id} not found.`);
  }

  const searchedRecipe = recipes[id];

  console.log(`Recipe ID: ${searchedRecipe.id} and recipe name: ${searchedRecipe.name}`);
}

export async function create(store: Store<RecipeType[]>, args: string[]) {
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const validDifficulties = ['easy', 'medium', 'hard'];

  if (args.length !== 2) {
    throw new AppError('Error: The create command requires exactly two arguments, the recipe name and difficulty level.');
  }

  const newId = recipes.length > 0 ? Math.max(...recipes.map((recipe) => recipe.id)) + 1 : 1;
  const name = args[0];
  const difficulty = args[1] as RecipeType['difficulty'];

  if (!validDifficulties.includes(difficulty)) {
    throw new AppError('Error: Difficulty must be one of the following: easy, medium, hard.');
  }

  const newRecipe: RecipeType = {
    id: newId,
    name: name,
    difficulty: difficulty
  };

  recipes.push(newRecipe);
  store.setValue(recipes);

  console.log(`New recipe is created with ID: ${newRecipe.id} and name: ${newRecipe.name}`);
}