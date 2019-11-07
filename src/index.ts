import * as cryptoJS from 'crypto-js'; 

class Block {
    constructor(index: number, hash: string, previousHash: string, timeStamp: number, data: string ) {
        this.index = index; 
        this.hash = hash; 
        this.previousHash = previousHash, 
        this.timeStamp = timeStamp, 
        this.data = data; 
    }
    public index: number; 
    public hash: string; 
    public previousHash: string; 
    public timeStamp: number; 
    public data: string; 

    static calculateHash = (index: number, previousHash: string, timeStamp: number, data: string) :string => 
        cryptoJS.SHA256(index + previousHash + timeStamp + data).toString();
    
    static validateStructure = (anyBlock: Block) :boolean => 
    typeof anyBlock.index === "number" &&
    typeof anyBlock.hash === "string" && 
    typeof anyBlock.previousHash === "string"  && 
    typeof anyBlock.timeStamp === "number" && 
    typeof anyBlock.data === "string" 

}

const genesisBlock :Block = new Block(0, 'kawekfkawf', '', 29083402, 'data');

let blockChain: Block[] = [genesisBlock];

const getBlockChain  = () :Block[] => blockChain; 

const getLatestBlock = () :Block => blockChain[blockChain.length -1]; 

const getNewTimestamp = () :number => Math.round(new Date().getTime() / 1000); 

const createNewBlock = (data:string) :Block => {
    const previousBlock :Block = getLatestBlock(); 
    const newIndex :number = previousBlock.index + 1; 
    const newTimestamp :number = getNewTimestamp(); 
    const newHash :string = Block.calculateHash(newIndex, previousBlock.hash, newTimestamp, data);
    const previousHash :string = previousBlock.hash; 
    const newBlock :Block = new Block(newIndex, newHash, previousHash, newTimestamp, data); 

    addBlockToChain(newBlock);
    return newBlock; 
}
const getHashForBlock = (anyBlock: Block) :string => 
Block.calculateHash(anyBlock.index, anyBlock.previousHash, anyBlock.timeStamp, anyBlock.data);

const isBlockValid = (previousBlock: Block, candidateBlock: Block) :boolean => {
    if(!Block.validateStructure(candidateBlock)) {
        return false;
    } else if(previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if(previousBlock.hash !== candidateBlock.previousHash) {
        return false; 
    } else if(getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true; 
    }
}
const addBlockToChain = (candidateBlock: Block) :void => {
    if(isBlockValid(getLatestBlock(), candidateBlock)) {
        blockChain.push(candidateBlock);
    }
}

createNewBlock('data1')
createNewBlock('data2')
createNewBlock('data3')
createNewBlock('data4')

console.log(getBlockChain())