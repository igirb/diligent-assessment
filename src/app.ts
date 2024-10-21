import { AppError } from './app.error';
import { list } from './commands';
import { Store } from './stores/store.type';
import { RecipeType } from './recipe';

type Command = (store: Store<RecipeType[]>, args: string[]) => Promise<void>

export async function createApp(store: Store<RecipeType[]>, args: string[], ) {
  const [, , command, ...restArgs] = args;
  
  const commands: Record<string, Command> = {
    'list': list
  }

  try {
  if(command in commands) {
    const commandFunction = commands[command] 
    await commandFunction(store, restArgs);
  } else {
    console.error(`Unknown command: ${command}`);
  }
} catch (error) {
  throw new AppError(`Please use the valid syntax for handling recipe commands: npm start -- <argument 1>`)
}

}