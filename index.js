const secrets = require('secrets.js-grempe');
const fs = require('fs');
const assert = require('assert');

// Use a determinstic random number for testing
const randomNumber = '536f5e2699b6ad0dc20b817276c32163';

// Generate a random number; Comment the earlier declared randomNumber
// const randomNumber = secrets.random(64)

console.log('Random  bit number:', randomNumber);

// Generate 7 shards of RandomNumber requiring at least 4 correct shares to recreate the secret.
const shardArray = secrets.share(randomNumber, 7, 4);
console.log(shardArray)

// use shares generated from the new randomNumber to combine.
const resurrect = secrets.combine([
    '80206930692e10bbcbbf0fe4235e4a0d6c5',
    '80390a27e60ffaeeb20a71cefd0f3f56dc4',
    '804d3c8747a645e4932ec4c308685069898']);
console.log('Resurrect:', resurrect)

// create local files to check if the value generated is the same
fs.writeFile('./randomNumber.txt', randomNumber, err => {
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

fs.writeFile('./resurrect.txt', resurrect, err => {
    if (err) {
        console.error(err)
        return
    }
})

// Check if the recreated value from the shares is equal to the randomnumber generated initially
if (resurrect === randomNumber) {
    console.log('Resurrected value constructed from the shards is equivalent to the original value.')
}