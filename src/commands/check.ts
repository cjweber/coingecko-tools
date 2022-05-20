import type { Arguments, CommandBuilder } from 'yargs';
import axios from "axios";
import { readFileSync } from 'fs';

type Options = {
  coinIdFilepath: string | undefined;
};

const baseUrl: string = 'https://api.coingecko.com/api/v3/';

export const command: string = 'check';
export const desc: string = 'Check prices for coins you care about';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .options({
      coinIdFilepath: { type: 'string' }
    });

export const handler = async (argv: Arguments<Options>): Promise<void> => {
  const { coinIdFilepath } = argv;
  await getInfo({ coinIdFilepath });
  process.exit(0);
};

const getInfo = async (params: { coinIdFilepath?: string }) => {
  const idString = readFile(params.coinIdFilepath);
  try {
    const response = await axios.get(
      `${baseUrl}/simple/price`,
      {
        params:
          { ids: idString, vs_currencies: 'usd', include_market_cap: 'true', include_24hr_vol: 'true', include_24hr_change: 'true', include_last_updated_at: 'true' }
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

const readFile = (coinIdFilepath?: string) => {
  const fileLocation = coinIdFilepath || './coinids.txt';
  const coinIdData = readFileSync(fileLocation).toString().split("\n").join(",");
  return coinIdData;
}
