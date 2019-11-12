const secrets = require('secrets.js-grempe');
const fs = require('fs');

// Generates a 512 bit number: 128 is hexadecimal for 512 bits
const random512Number = secrets.random(128);
console.log('Random 512 bit number:', random512Number);

var shardArray = secrets.share(random512Number, 10, 5);

fs.writeFile('./random512Number.txt', random512Number, err => {
    if (err) {
      console.error(err)
      return
    }
})

fs.writeFile('./shardArray.txt', shardArray, err => {
    if (err) {
      console.error(err)
      return
    }
})