// import conf from '@/config.json';
import { IRandao } from '@/types';
import { LogCampaignAddedEvent, LogGetRandomEvent } from '@/types/IRandao';
import Debug from 'debug';
import { Contract, JsonRpcProvider, Wallet, ethers } from 'ethers';
import { RandaoAbi } from './abis';
import { CmdOpts2, Config, conf, initConf, initOpts2, opts2 } from './model';
import { waitBlocks } from './subtask';

const logDebug = Debug('debug');
const logInfo = Debug('info');
const logErr = Debug('error');

async function main() {
  logInfo('campaign start...');

  try {
    (opts2 as unknown as CmdOpts2) = initOpts2();
    (conf as unknown as Config) = initConf(opts2.config);

    logDebug('cmd opts:', opts2);
    logDebug('config:', conf);

    const provider = new JsonRpcProvider(conf.chain.endpoint);
    const signer = new Wallet(conf.chain.participant, provider);
    const randao1 = new ethers.Contract(
      conf.chain.randao,
      RandaoAbi,
      signer,
    ) as unknown as IRandao;

    logInfo('campaigm account:', signer.address);

    const bnum = BigInt((await provider.getBlockNumber()) + 20);
    const deposit = 1000_000_000_000_000_000n;
    const commit_balkline = 16;
    const commit_deadline = 8;
    const maxFee = 10_000_000_000_000_000n;

    logDebug(await provider.getBlockNumber(), parseInt(bnum.toString()));
    let tx = await randao1.newCampaign(
      bnum,
      deposit,
      commit_balkline,
      commit_deadline,
      maxFee,
      { value: deposit },
    );
    logDebug(await provider.getBlockNumber(), parseInt(bnum.toString()));
    let receipt = await tx.wait();
    if (receipt == null) {
      throw 'newCampaign receipt get failed';
    }
    if (receipt!.status != 1) {
      throw 'newCampaign transaction failed';
    }
    logDebug(await provider.getBlockNumber(), parseInt(bnum.toString()));

    let event1 = (randao1 as unknown as Contract).interface.parseLog(
      receipt!.logs[0] as unknown as { topics: Array<string>; data: string },
    );
    const [campaignID, , , , , , , , ,]: LogCampaignAddedEvent.OutputTuple = (
      event1! as unknown as { args: LogCampaignAddedEvent.OutputTuple }
    ).args;
    logDebug('LogCampaignAdded event:', campaignID);

    logInfo('campaign put:', campaignID);

    logDebug(await provider.getBlockNumber(), parseInt(bnum.toString()));
    await waitBlocks(provider, parseInt(bnum.toString()));
    logDebug(await provider.getBlockNumber(), parseInt(bnum.toString()));

    tx = await randao1.getRandom(campaignID);
    receipt = await tx.wait();
    if (receipt == null) {
      throw 'getRandom receipt get failed';
    }
    if (receipt!.status != 1) {
      throw 'getRandom transaction failed';
    }

    event1 = (randao1 as unknown as Contract).interface.parseLog(
      receipt!.logs[0] as unknown as { topics: Array<string>; data: string },
    );
    const [campaignID2, random]: LogGetRandomEvent.OutputTuple = (
      event1! as unknown as { args: LogGetRandomEvent.OutputTuple }
    ).args;
    logDebug('LogGetRandomType event:', campaignID2, random);

    logInfo('campaign successful:', campaignID, random);
  } catch (e) {
    logErr('run error', e);
  }
}

main().catch((error) => {
  logErr(error);
  process.exitCode = 1;
});
