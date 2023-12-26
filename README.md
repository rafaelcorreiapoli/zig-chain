# ZigChain

ZigPay on Blockchain

### Environment variables

create `.env` file on root and set these variables:

```

INFURA_API_KEY=
SEPOLIA_PRIVATE_KEY=
ETHERSCAN_API_KEY=
```


### Scripts

```shell
# start local blockchain
$ bun node

# run tests
$ bun test

# compile contracts
$ bun compile

# deploy contracts to local blockchain
$ bun deploy:local

# deploy contracts to testnet
$ bun deploy:testnet

# verify contracts on testnet
$ bun verify:testnet
```
