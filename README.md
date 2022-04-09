# GuildHalls

Write something here...

### start your local ganache

For testnet deployment you can skip this step.

```
ganache-cli --port 7545 --accounts 5  --mnemonic 'approve board satisfy slender emotion acid canal object number cloud brass achieve' --networkId 5777 --hardfork london
```

### migrate the main contract to your local node

```
truffle migrate --reset --skip-dry-run --network testnet
```
