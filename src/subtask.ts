import { IRandao } from '@/types';
import { bufToBigint } from 'bigint-conversion';
import Debug from 'debug';
import { ContractTransactionResponse, JsonRpcProvider, ethers } from 'ethers';
import sleep from 'sleep-promise';
import util from 'util';

export { subtask, waitBlocks };

const mutex1: { lock: boolean } = { lock: false };

let available_nonce1 = 0;

async function subtask(
  randao: IRandao,
  provider: JsonRpcProvider,
  account: string,
  campaignID: bigint,
  _bnum: bigint,
  deposit: bigint,
  commitBalkline: bigint,
  commitDeadline: bigint,
) {
  const logDebug = Debug('debug');
  const logInfo = Debug('info');

  logInfo('participant join:', campaignID);

  const balkline = parseInt((_bnum - commitBalkline).toString());
  const deadline = parseInt((_bnum - commitDeadline).toString());
  const bnum = parseInt(_bnum.toString());

  // step1
  logDebug('step1 begin:', campaignID);
  const s = bufToBigint(ethers.randomBytes(32));
  const hs = await randao.shaCommit(s);
  logDebug('step1 end:', campaignID);

  // step2
  logDebug('step2 begin:', campaignID);
  let currBnum = await waitBlocks(provider, balkline);
  if (currBnum > deadline) {
    throw 'Too late to commit to campaign!!!';
  }

  let pending_nonce: number;
  let tx: ContractTransactionResponse;
  try {
    await lock(mutex1);
    pending_nonce = await provider.getTransactionCount(account, 'pending');
    logDebug(pending_nonce, available_nonce1);

    if (pending_nonce < available_nonce1) {
      tx = await randao.commit(campaignID, hs, {
        value: deposit,
        nonce: available_nonce1,
      });
      available_nonce1 += 1;
    } else {
      tx = await randao.commit(campaignID, hs, {
        value: deposit,
        nonce: pending_nonce,
      });
      available_nonce1 = pending_nonce + 1;
    }
  } catch (err) {
    throw util.format('getTransactionCount or commit failed:', campaignID, err);
  } finally {
    unLock(mutex1);
  }
  logDebug('step2 end:', campaignID);

  // step3
  logDebug('step3 begin:', campaignID);
  currBnum = await waitBlocks(provider, deadline + 1);
  if (currBnum >= bnum) {
    throw 'Too late to reveal to campaign!!!';
  }

  let receipt = await tx.wait();
  if (receipt == null) {
    throw util.format('commit receipt get failed');
  }
  if (receipt!.status != 1) {
    throw util.format('commit transaction failed', campaignID);
  }
  try {
    await lock(mutex1);
    pending_nonce = await provider.getTransactionCount(account, 'pending');
    if (pending_nonce < available_nonce1) {
      tx = await randao.reveal(campaignID, s, { nonce: available_nonce1 });
      available_nonce1 += 1;
    } else {
      tx = await randao.reveal(campaignID, s, { nonce: pending_nonce });
      available_nonce1 = pending_nonce + 1;
    }
  } catch (err) {
    throw util.format('getTransactionCount or reveal failed:', campaignID, err);
  } finally {
    unLock(mutex1);
  }
  logDebug('step3 end:', campaignID);

  // step4
  logDebug('step4 begin:', campaignID);
  await waitBlocks(provider, bnum);

  receipt = await tx.wait();
  if (receipt == null) {
    throw util.format('reveal receipt get failed', campaignID);
  }
  if (receipt!.status != 1) {
    throw util.format('reveal transaction failed', campaignID);
  }
  try {
    await lock(mutex1);
    pending_nonce = await provider.getTransactionCount(account, 'pending');
    if (pending_nonce < available_nonce1) {
      tx = await randao.getMyBounty(campaignID, { nonce: available_nonce1 });
      available_nonce1 += 1;
    } else {
      tx = await randao.getMyBounty(campaignID, { nonce: pending_nonce });
      available_nonce1 = pending_nonce + 1;
    }
  } catch (err) {
    throw util.format(
      'getTransactionCount or getMyBounty failed:',
      campaignID,
      err,
    );
  } finally {
    unLock(mutex1);
  }
  receipt = await tx.wait();
  if (receipt == null) {
    throw util.format('getMyBounty receipt get failed', campaignID);
  }
  if (receipt!.status != 1) {
    throw util.format('getMyBounty transaction failed', campaignID);
  }
  logDebug('step4 end:', campaignID);
  logInfo('participant successful:', campaignID);
}

async function waitBlocks(
  provider: JsonRpcProvider,
  destBum: number,
): Promise<number> {
  let currBum = await provider.getBlockNumber();
  while (currBum < destBum) {
    currBum = await provider.getBlockNumber();
    // if (currBum >= destBum) {
    //   break;
    // }
    // // logDebug(currBum, destBum);
    await sleep(500);
  }
  return currBum;
}

async function lock(mutex: { lock: boolean }) {
  while (mutex.lock) {
    await sleep(100);
  }
  mutex.lock = true;
}

function unLock(mutex: { lock: boolean }) {
  mutex.lock = false;
}
