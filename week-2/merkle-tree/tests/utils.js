const crypto = require('crypto');
const { assert } = require('chai');

// Use the crypto module to create a sha256 hash from the data passed in
function sha256(data) {
  return crypto.createHash('sha256').update(data).digest();
}

// The concat function we use to hash together Merkle leaves
function concatHash(left, right) {
  if (!left)
    throw new Error('The concat function expects two hash arguments, the first was not receieved.');
  if (!right)
    throw new Error(
      'The concat function expects two hash arguments, the second was not receieved.'
    );
  return sha256(Buffer.concat([left, right]));
}

// The concat function we use to show the Merkle root calculation
function concatLetters(left, right) {
  return `Hash(${left} + ${right})`;
}

// Given a proof, finds the Merkle root
function hashProof(node, proof) {
  let data = sha256(node);

  for (let i = 0; i < proof.length; i++) {
    const buffers = proof[i].left ? [proof[i].data, data] : [data, proof[i].data];
    data = sha256(Buffer.concat(buffers));
  }

  return data;
}

module.exports = { concatHash, concatLetters, hashProof, sha256 };
