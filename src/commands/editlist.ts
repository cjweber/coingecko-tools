import type { Arguments, CommandBuilder } from 'yargs';
import { appendFileSync, readFileSync, writeFileSync } from 'fs';

type Options = {
  id: string;
  dry: boolean | undefined;
  remove: boolean | undefined;
  coinIdFilepath: string | undefined;
};


export const command: string = 'editlist';
export const desc: string = 'Edit list of ids to check';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
      coinIdFilepath: { type: 'string' },
      dry: { type: 'boolean' },
      id: { type: 'string', default: "" },
      remove: { type: 'boolean' }
    });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { coinIdFilepath, dry, remove, id } = argv;
  editList({ coinIdFilepath, dry, id, remove });
  process.exit(0);
};

const editList = (params: { coinIdFilepath?: string, id: string, remove?: boolean, dry?: boolean }) => {
  let filePath = resolveFilepath(params.coinIdFilepath);
  if (params.dry) {
    console.log(readFile(filePath));
  } else {
    if (params.remove) {
      removeId(filePath, params.id);
    } else {
      addId(filePath, params.id);
    }
  }
}
const addId = (coinIdFilepath: string, id: string) => {
  console.log(`Adding ${id} ...`);
  appendFileSync(coinIdFilepath, `${id}\n`);
}
const removeId = (filePath: string, id: string) => {
  console.log(`Removing ${id} ...`);
  const fileContent = readFile(filePath);
  const newFileContent = fileContent.replace(`${id}\n`, "");
  writeFile(filePath, newFileContent);
}

const readFile = (coinIdFilepath: string) => {
  return readFileSync(coinIdFilepath).toString();
}

const writeFile = (coinIdFilepath: string, content: string) => {
  writeFileSync(coinIdFilepath, content);
}

const resolveFilepath = (coinIdFilepath?: string) => {
  return coinIdFilepath || './coinids.txt';
}
