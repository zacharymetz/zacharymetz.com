---
title: When Web3 Infra dosen't have the right checks in place
description: this is the description
date: 12-12-2025
time-to-read: 12m
---

## Summary

The safe transaction service is configured with smart contracts that aren't the official verified deployment ones on zksync. Zksync uses a special version of the safe smart contract to account for the way `execTransaction` handles reentry from `MultiSendCallOnly`, this happens when you do nested safe batch transaction. The L1 smart contracts got deployed and updated in the safe transaction service but, their source code was not uploaded to the main zksync block explorers, this affects all safe made in the public app since x date.

## Discovery

I was setting up a nested safe structure to test batch delegations on the zksync chain. After setting them up the simulation kept failing for the proposed safe transaction. The encoding was right but, it looked a bit strange when I went to debug it further in [tenderly](https://www.tdly.co/shared/simulation/dc642f05-71f4-4684-b825-ef5946898374). None of the smart contract code would load from the block explorer which should not be the case for safe smart contracts ([example of a normal nested safe simulation](https://www.tdly.co/shared/simulation/1967aaea-6778-4664-92da-80d037c83246)).

### New Smart Contract Deployed

The revert came from an error when trying a [smart contract](https://etherscan.io/address/0x3E5c63644E683549055b9Be8653de26E0B4CD36E#code) that looked familiar from the mainnet.

```
[ REVERT ]  0x3e5c63644e683549055b9be8653de26e0b4cd36e.0x(0x)
```

Thats the canonical GnosisSafeL2 deployment thats on many chains including the [BNB smart chain](https://bscscan.com/address/0x3E5c63644E683549055b9Be8653de26E0B4CD36E#code). But, when you check the [block explorer](https://explorer.zksync.io/address/0x3E5c63644E683549055b9Be8653de26E0B4CD36E#contract) to see what smart contract is deployed you are met with the following error:

![No verified smart contract uploaded](/images/zksync-safe-post/unverifed-contract.png =500)

The safe smart contract deployed to zksync has a few changes in it and its address is [0x1727...2b70](https://explorer.zksync.io/address/0x1727c2c531cf966f902E5927b98490fDFb3b2b70#contract), its smart contract code is deployed.

![Verified smart contract uploaded](/images/zksync-safe-post/verified-contract.png =500)

### Smart Contract Updated in safe configs

After this strange discovery I went to go check the safe contract used to create a safe on zksync more than a year ago to this one created 2 months ago.

The safe that failed the tenderly simulation above was [created](https://app.safe.global/transactions/history?safe=zksync:0x9137375Ca743A356b76909b25F6eB3d86F99Eb62) with [0x3E5c...D36E](https://explorer.zksync.io/address/0x3E5c63644E683549055b9Be8653de26E0B4CD36E#contract) (the wrong contract) using the official app.safe.global.

![Verified smart contract uploaded](/images/zksync-safe-post/bad-safe-config.png =500)

Contrast that with a safe [created](https://app.safe.global/transactions/history?safe=zksync:0xeC1515B0401b33d80974D0AFEd1111ABf465169b) more than a year ago that references the right master copy.

![Verified smart contract uploaded](/images/zksync-safe-post/good-safe-config.png =500)

Checking the api call to the safe service to get the configs confirms that the public safe services are configured incorrectly. The smart contracts they they are advertising are not the proper ones and do not have their code uploaded to the block explorer

## Source

safe keeps a master list of all their smart contracts that are deployed across all networks here. They have a seperate config for zk sync on there.

```

```

Taking a look at the history of change for this file we can see that on x day it was added to the list and deployed to the chain around the same time.

Since we can see what the config is from the transaction service, ( it just returns whats in the config ). Not sure if its connected automatically to the config here but seems like it

the public safe apps read from this and ( maybe the sdks do too ? ) so any safe created with those will be affected

## Effects

The source code is mostly the same, expect for one part that does this :

show it here

This part enables a parent safe call a child safe via a multisend smart contract. this does not affect sending a batch of transaction out of the safe, but if you want to send a batch of transactions and one of those transactions is an execTransaction on another safe then it will fail.

This change isn't harmful and as far as i can tell has not caused loss of funds for anyone sending it to child safes. the enterprises i know of that use smart wallets create them with in house tools. Just for such a case.

Whats interesting to me is that gnosis will update its registry for smart contracts that are not verified on the chain they have been deployed on. In this case it was harmless but what if a threat actor add some sort of malicious code into the smart contract and was able to update a registry to use that smart contract. Regular users would not know and trust the config.
