/**
 * Verify a proof that a given leaf node is within the tree.
 *
 * @param {Object[]} proof - An array of objects whose properties are data and left
 * @param {string} node - A leaf node we're trying to prove is within the tree
 * @param {string} root - The valid Merkle root
 * @param {function} concat - The method used to combine the leaf nodes
 * @return {boolean}
 */
function verifyProof(proof, node, root, concat) {
  let data = node;

  for (const element of proof) {
    if (element.left) {
      data = concat(element.data, data);
    } else {
      data = concat(data, element.data);
    }
  }

  return data === root;
}

module.exports = verifyProof;
