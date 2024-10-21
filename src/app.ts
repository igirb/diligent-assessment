import { AppError } from './app.error';
import { list, details, create } from './commands';
import { Store } from './stores/store.type';
import { RecipeType } from './recipe';

type Command = (store: Store<RecipeType[]>, args: string[]) => Promise<void>

export async function createApp(store: Store<RecipeType[]>, args: string[], ) {
  const [, , command, ...restArgs] = args;
  
  const commands: Record<string, Command> = {
    'list': list,
    'details': details,
    'create': create,
  }

  try {
  if(command in commands) {
    const commandFunction = commands[command] 
    await commandFunction(store, restArgs);

    if (command === 'list' && restArgs.length > 0) {
      throw new AppError('Error: The list command should not have any arguments.');
    }
  } else {
    throw new AppError(`Unknown command: ${command}`);
  }
} catch (error) {
  if(error instanceof AppError) {
    console.error(error.message)
  } else {
  console.log(error)
  }
}

}