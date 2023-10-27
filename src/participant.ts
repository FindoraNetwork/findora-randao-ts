// import conf from '@/config.json';
import { IRandao } from '@/types';
import { LogCampaignAddedEvent } from '@/types/IRandao';
import Debug from 'debug';
import { JsonRpcProvider, Wallet, ethers } from 'ethers';
import { RandaoAbi } from './abis';
import { CmdOpts, Config, conf, initConf, initOpts, opts } from './model';
import { subtask } from './subtask';

const logDebug = Debug('debug');
const logInfo = Debug('info');
const logErr = Debug('error');

async function main() {
  logInfo('participant start...');

  try {
    (opts as unknown as CmdOpts) = initOpts();
    (conf as unknown as Config) = initConf(opts.config);

    logDebug('cmd opts:', opts);
    logDebug('config:', conf);

    const provider = new JsonRpcProvider(conf.chain.endpoint);
    const signer = new Wallet(conf.chain.participant, provider);
    const randao = new ethers.Contract(
      conf.chain.randao,
      RandaoAbi,
      signer,
    ) as unknown as IRandao;
    const subtasks = new Map<bigint, Promise<void>>();

    logInfo('participant account:', signer.address);

    randao.on(
      randao.filters.LogCampaignAdded(undefined, undefined, undefined),
      async (event1) => {
        const [
          campaignID,
          ,
          ,
          bnum,
          deposit,
          commitBalkline,
          commitDeadline,
          ,
          ,
        ]: LogCampaignAddedEvent.OutputTuple = (
          event1 as unknown as { args: LogCampaignAddedEvent.OutputTuple }
        ).args;

        logDebug(
          'LogCampaignAdded event:',
          campaignID,
          bnum,
          deposit,
          commitBalkline,
          commitDeadline,
        );

        if (!subtasks.has(campaignID)) {
          const subtask1 = subtask(
            randao,
            provider,
            signer.address,
            campaignID,
            bnum,
            deposit,
            commitBalkline,
            commitDeadline,
          ).catch((err) => {
            logErr('subtask error:', err);
          });

          subtasks.set(campaignID, subtask1);
        }
        while (subtasks.size > conf.chain.opts.max_campaigns) {
          const subtask2 = [...subtasks.entries()].pop();
          if (subtask2 != null) {
            const [campaignID2, subtask3] = subtask2!;
            await subtask3;
            subtasks.delete(campaignID2);
          }
        }
      },
    );
  } catch (e) {
    logErr('run error', e);
  }
}

main().catch((error) => {
  logErr(error);
  process.exitCode = 1;
});
