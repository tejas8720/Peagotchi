
import { Revise } from "revise-sdk";
import fs from 'fs';

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZjM2ZhMzg0LTJmMzYtNDhlNC1hYjI3LTI2MmIwZjJlNWZhMyIsImtleSI6IjB4OXExMG00IiwiaWF0IjoxNjY0MTQzNDQzfQ.sZAITgYVoi-27sayi6gTR5W4PGgHNybyvjNEW1CfXck"; //this needs to be replaced by the AUTH TOKEn you generate
const revise = new Revise({auth: AUTH_TOKEN});

var seed = fs.readFileSync('../nft-metadata/temp0/seed.json', 'utf8');
seed = JSON.parse(seed);


// // adding metadata to revise
async function addDataToRevise(collection_name, collection_uri, data) {
  var collection_name = collection_name;
  var collection_uri = collection_uri;
  try {
    const collection = await revise.addCollection({
      name : collection_name,
      uri : collection_uri
    });
  } catch (error) {
    console.log("error 1");
  }

  const tokenData = {
    "image" : seed['image'],
    "name" : seed['name'],
    "tokenId" : String(seed['token_id']),
    "description": seed['description']
  }

  console.log(tokenData);

  const properties = data['attributes'];
  try {
    const nft = await revise.addNFT(tokenData, properties);
  } catch (error) {
    console.log("error 2");
  }
}

// adding temp0 data to revise
addDataToRevise("Peas for climate", "peas-for-climate", seed);
