import abi from "../abi/abi.json" assert {type: "json"};


// New NFT
const buttonMint = document.getElementById('mint-seed');
buttonMint.addEventListener('click', mintNFT);

function mintNFT() {
    // If Metamask is not available
    if (typeof window.ethereum == "undefined") {
        rej("You should install Metamask to use it!");
        alert("Login to Metamask");
    }
    // Web3 Instance 
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, "0x7618f41e0B4bE75d0CA163987053A6AE9D92c7dA");

    web3.eth.getAccounts().then((accounts) => {
        contract.methods.safeMint().send({ from: accounts[0] }).then((data) => {
            console.log("NFT Added");
        });
    });
}