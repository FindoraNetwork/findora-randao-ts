import { readFileSync } from 'fs';
import yargs from 'yargs';
import z from 'zod';

export {
  CmdOpts,
  CmdOpts2,
  Config,
  ConfigSchema,
  conf,
  initConf,
  initOpts,
  initOpts2,
  opts,
  opts2,
};

let conf: Config;
let opts: CmdOpts;
let opts2: CmdOpts2;

const ConfigSchema = z.object({
  chain: z.object({
    name: z.string(),
    chain_id: z.string(),
    endpoint: z.string(),
    event_endpoint: z.string(),
    participant: z.string(),
    campaigner: z.string(),
    randao: z.string(),
    opts: z.object({
      gas_limit: z.string(),
      max_gas_price: z.string(),
      min_gas_reserve: z.string(),
      max_deposit: z.number(),
      min_rate_of_return: z.number(),
      min_reveal_window: z.number(),
      max_reveal_delay: z.number(),
      max_campaigns: z.number(),
      start_block: z.number(),
    }),
  }),
  http_listen: z.string(),
});

type Config = z.infer<typeof ConfigSchema>;

function initConf(path: string): Config {
  const conf_str = readFileSync(path).toString();
  return ConfigSchema.parse(JSON.parse(conf_str));
}

class CmdOpts {
  config: string = '';
  campaigns: string = '';
}

class CmdOpts2 {
  config: string = '';
}

function initOpts(): CmdOpts {
  const opts = yargs
    .strict()
    .strictCommands()
    .option('config', {
      describe: 'config file path',
      default: 'config.json',
      alias: 'c',
      type: 'string',
    })
    .option('campaigns', {
      describe: 'campaigns directory path',
      default: 'campaigns',
      alias: 'a',
      type: 'string',
    })
    .usage('Usage: participant [command] <options>')
    .parserConfiguration({
      'strip-aliased': true,
      'duplicate-arguments-array': false,
    })
    .parseSync() as CmdOpts;

  // console.log('command options: ', opts);
  return opts;
}

function initOpts2(): CmdOpts2 {
  const opts = yargs
    .strict()
    .strictCommands()
    .option('config', {
      describe: 'config file path',
      default: 'config.json',
      alias: 'c',
      type: 'string',
    })
    .usage('Usage: campaign [command] <options>')
    .parserConfiguration({
      'strip-aliased': true,
      'duplicate-arguments-array': false,
    })
    .parseSync() as CmdOpts2;

  // console.log('command options: ', opts);
  return opts;
}
