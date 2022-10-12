const assetsFolder = './assets/Genesis';
const fs = require('fs');
const util = require('util')
let collection = []

// const nft = {
//   "name": "DecentriaGenesis#1",
//   "description": "Remember to replace this description",
//   "image": "ipfs://NewUriToReplace/1.png",
//   "dna": "26dce3d3a66231d6cc7133e1b4f85b297f79f33a",
//   "edition": 1,
//   "date": 1644421750261,
//   "attributes": [
//     {
//       "trait_type": "Airdrop",
//       "value": "1000"
//     },
//     {
//       "trait_type": "Character",
//       "value": "Jesus"
//     },
//     {
//       "trait_type": "Type",
//       "value": "Celestial"
//     }
//   ],
//   "compiler": "Infinity Engine"
// }

const createCollection = async () => {
  await fs.readdir(assetsFolder, (err, rarities) => {
    rarities = rarities.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
    rarities.forEach(rarity => {
      fs.readdir(`${assetsFolder}/${rarity}`, (err, names) => {
        names.forEach(name => {
          fs.readdir(`${assetsFolder}/${rarity}/${name}`, (err, images) => {
            images.forEach( image => {
              const index = parseFloat(image.replace('.jpg', ''))
              let nft = {}
              nft.name = `DecentriaGenesis#${image.replace('.jpg', '')}`;
              nft.image = `"ipfs://NewUriToReplace/${image}"`;
              nft.description = `Remember to replace this description`;
              nft.attributes = []
              nft.attributes[0] = {
                "trait_type": "Airdrop",
                value: 'airdrop_' + rarity
              }
              nft.attributes[1] = {
                "trait_type": "Character",
                value: name
              }
              nft.attributes[2] = {
                "trait_type": "Type",
                value: rarity
              }
              collection[index - 1] = nft
            })
          });
        })
      });
    });
    return collection;
  })
}


createCollection().then( async () => {
  await setTimeout( () => {
    fs.writeFileSync('collection.json', JSON.stringify(collection, null, 2));
  }, 3000)
})



