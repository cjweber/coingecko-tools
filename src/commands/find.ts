import type { Arguments, CommandBuilder } from 'yargs';
import axios from "axios";

type Options = {
  term: string;
};
const baseUrl: string = 'https://api.coingecko.com/api/v3/';

export const command: string = 'find <term>';
export const desc: string = 'Get list of ids with search term: <term>';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
      term: { type: 'string', required: true },
    });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { term } = argv;
  await findId(term);
  process.exit(0);
};

const findId = async (term: string) => {
  try {
    const response = await axios.get(
      `${baseUrl}/search`,
      {
        params:
          { query: term }
      }
    );
    console.log(`Top 3: ${JSON.stringify(response.data.coins.slice(0, 3), null, 2)}`);
  } catch (error) {
    console.log(error);
  }
}
