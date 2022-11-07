// const { Revise } = require("revise-sdk");
import { Revise } from "revise-sdk";
import fs from 'fs';

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZjM2ZhMzg0LTJmMzYtNDhlNC1hYjI3LTI2MmIwZjJlNWZhMyIsImtleSI6IjB4OXExMG00IiwiaWF0IjoxNjY0MTQzNDQzfQ.sZAITgYVoi-27sayi6gTR5W4PGgHNybyvjNEW1CfXck"; //this needs to be replaced by the AUTH TOKEn you generate
const revise = new Revise({auth: AUTH_TOKEN});

var germination_0temp = fs.readFileSync('../nft-metadata/temp0/germination-0temp.json').toString();
germination_0temp = JSON.parse(germination_0temp);
var flowering_0temp = fs.readFileSync('../nft-metadata/temp0/flowering-0temp.json', 'utf8').toString();
flowering_0temp = JSON.parse(flowering_0temp);
var mature_0temp = fs.readFileSync('../nft-metadata/temp0/mature-0temp.json').toString();
mature_0temp = JSON.parse(mature_0temp);


const avg_temp = 17;
const number_days = 60;

async function automate(data) {
    const tokenData = {
      "image" : data['image'],
      "name" : data['name'],
      "tokenId" : String(data['token_id']),
      "description": data['description']
    }
    console.log(tokenData);
    const nft = await revise.fetchNFT('6881fd8e-aac7-4fde-9116-7dfcd80874e6');
    const nftobject = revise.nft(nft);
    nftobject.setProperty().setImage(tokenData['image'])
    .setName(tokenData['name'])
    .setTokenId(tokenData['tokenId'])
    .setDescription(tokenData['description'])
    .save();
}

async function handler(avg_temp, number_days) {
    var day_count = number_days;
    var avg_temp = avg_temp;

    console.log('checking 1')

    if((avg_temp > 12 && avg_temp <18) && (day_count > 10 && day_count <50) ) {
      console.log('checking 2')
      const data = germination_0temp;
      automate(data);
    }

    else if((avg_temp > 12 && avg_temp <18) && (day_count > 50 && day_count <80) ) {
      const data = flowering_0temp;
      automate(data);
      console.log('checking 3')
    }

    else if((avg_temp > 12 && avg_temp <18) && (day_count > 90 && day_count <120)) {
      const data = mature_0temp;
      automate(data);
      console.log('checking 4')
    }
};

handler(avg_temp, number_days);