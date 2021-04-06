# Todo App with Truffle and Go Ethereum

## Install Geth In VM
```
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum
```

## Initial Genesis File
```json
{
	"config": {
		"chainId": 1999,
		"homesteadBlock": 1,
		"eip150Block": 2,
		"eip150Hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
		"eip155Block": 3,
		"eip158Block": 3,
		"byzantiumBlock": 4,
		"constantinopleBlock": 5,
		"ethash": {}
	},
	"nonce": "0x0",
	"timestamp": "0x5d357c6b",
	"extraData": "0x0000000000000000000000000000000000000000000000000000000000000000",
	"gasLimit": "0x10000000000",
	"difficulty": "0x10000",
	"mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
	"coinbase": "0x5b195b16dc4a8e8da06cf646cca12cc4ebaff12f",
	"alloc": { },
	"number": "0x0",
	"gasUsed": "0x0",
	"parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

## Create initial from genesis.json
```
geth --datadir <directory_name> init genesis.json
```
## Open Console for http node
```
geth --rpc --rpcport "8545" --rpccorsdomain "*" --datadir node1 --port "30303" --nodiscover --rpcapi "eth,net,web3,personal,miner,admin" --rpcaddr="0.0.0.0" --networkid 1900 --nat "any" --allow-insecure-unlock console
```
## Open console for normal node
```
geth --datadir node2 --port "30303" --nodiscover --networkid 1900 --nat "any" console
```
```
geth --datadir node3 --port "30303" --nodiscover --networkid 1900 --nat "any" console
```
## Admin 
### Admin Info
```
admin.nodeInfo
```

## Account
### Create Account
```
personal.newAccount()
```

### List Account
```
personal.listAccount
```

## Peer
### Add Peer
```
admin.addPeer(<peer enode>)
```
### Peer List
```
admin.peers
```

## Truffle

```
truffle compile
```
```
personal.unlockAccount(eth.accounts[0],"<password>","<duration>")
```
```
truffle migrate
```