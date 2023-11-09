/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type { IRandao, IRandaoInterface } from "../IRandao";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "campaignID",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "currbNum",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bnum",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deposit",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "commitBalkline",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "commitDeadline",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountypot",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "maxParticipant",
        type: "uint256",
      },
    ],
    name: "LogCampaignAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "CampaignId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "commitment",
        type: "bytes32",
      },
    ],
    name: "LogCommit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "CampaignId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bountypot",
        type: "uint256",
      },
    ],
    name: "LogFollow",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "CampaignId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "random",
        type: "uint256",
      },
    ],
    name: "LogGetRandom",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "CampaignId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "secret",
        type: "uint256",
      },
    ],
    name: "LogReveal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignID",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_hs",
        type: "bytes32",
      },
    ],
    name: "commit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignID",
        type: "uint256",
      },
    ],
    name: "follow",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignID",
        type: "uint256",
      },
    ],
    name: "getCampaign",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "bnum",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deposit",
            type: "uint256",
          },
          {
            internalType: "uint16",
            name: "commitBalkline",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "commitDeadline",
            type: "uint16",
          },
          {
            internalType: "uint256",
            name: "random",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "settled",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "bountypot",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "commitNum",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "revealsNum",
            type: "uint32",
          },
        ],
        internalType: "struct IRandao.CampaignInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignID",
        type: "uint256",
      },
    ],
    name: "getCommitment",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignID",
        type: "uint256",
      },
    ],
    name: "getMyBounty",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignID",
        type: "uint256",
      },
    ],
    name: "getRandom",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_bnum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_deposit",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "_commitBalkline",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "_commitDeadline",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "_maxTxFee",
        type: "uint256",
      },
    ],
    name: "newCampaign",
    outputs: [
      {
        internalType: "uint256",
        name: "_campaignID",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "numCampaigns",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignID",
        type: "uint256",
      },
    ],
    name: "refundBounty",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_campaignID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_s",
        type: "uint256",
      },
    ],
    name: "reveal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_s",
        type: "uint256",
      },
    ],
    name: "shaCommit",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

export class IRandao__factory {
  static readonly abi = _abi;
  static createInterface(): IRandaoInterface {
    return new Interface(_abi) as IRandaoInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IRandao {
    return new Contract(address, _abi, runner) as unknown as IRandao;
  }
}