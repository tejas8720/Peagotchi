import buy_abi from "../abi/buy_abi.json" assert {type: "json"};

// Buy NFT
const buyNFT_plantButton = document.getElementById('buy-nft-plant');
buyNFT_plantButton.addEventListener('click', buyNFT_plant);

function buyNFT_plant() {
    console.log('Click');
    // let uri = {
    //     "name": "New Plant",
    //     "description": "Pea grains is here",
    //     "image": "ipfs://QmasyTnisRwa1h59bqydcuUTzrsUTx65NGXNmAnhDKtoQd/1-growth.png"
    //   };

    let uri = "ipfs://QmQJxdnLUbtweikvHz6mZAjbAr8wbzGffzFwF9AUaPffvF";

    // If Metamask is not available
    if (typeof window.ethereum == "undefined") {
        rej("You should install Metamask to use it!");
        alert("Login to Metamask");
    }

    // Web3 Instance
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(buy_abi, "0xfa1c7549bC55B9CcAC75beAC431c7Fdf9A4fc595");

    web3.eth.getAccounts().then((accounts) => {
        contract.methods.safeMint(uri).send({ from: accounts[0] }).then((data) => {
            console.log("You owns new nft");
            alert("You owns new nft");
        });
    });
}