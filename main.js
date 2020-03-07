const Web3 = require ('web3')
const EthereumTx=require('ethereumjs-tx')
const solc = require ('solc')
const fs = require('fs')

const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/625a9d98db864a589fd9f7419c3ac726"))




const myAddress ='0xa188B77DC67978141756cF6c6D946C6E02aa1aE1'
const myAddressKey= Buffer.from('86405FD8C3B4247124E106576217846253FBC118978059BD7324AF7780002947','hex');



const content=fs.readFileSync('contrato.sol').toString()
const objectSolc={
language: 'Solidity',
sources:{
'contrato':{

    content:content
}
},
settings:{
outputSelection:{
    '*':{
        '*':['*']
    }
}

}

}


const output =JSON.parse(solc.compile(JSON.stringify(objectSolc)))
const byteCodeContract=output.contracts.contrato.contratoespecifico.evm.bytecode.object


web3.eth.getTransationCount(myAddress,(err,txCount)=>{
const toObject={
    nonce:web3.utils.toHex(txCount),
    to:null,
    gasLimit :web3.utils.toHex(1000000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('2','gwei')),
    data:'0x'+byteCodeContract

 
}

const tx =new EthereumTx(txObject)
tx.sign(myAddressKey)
web3.eth.sendSignedTransaction('0x',seriaLizedTx).on('receipt',receipt=>{
    console.log("Contrato subido:"+receipt.contractAddress)
})


})
