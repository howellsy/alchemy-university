class MerkleTree {
  constructor(leaves, concat) {
    this.leaves = leaves;
    this.concat = concat;
  }

  getRoot(leaves = this.leaves) {
    // if we've reached the root, return it
    if (leaves.length === 1) {
      return leaves[0];
    }

    const layer = [];

    // iterate over leaves to build the next layer
    for (let i = 0; i < leaves.length; i += 2) {
      const left = leaves[i];
      const right = leaves[i + 1];

      if (right) {
        layer.push(this.concat(left, right));
      } else {
        layer.push(left);
      }
    }

    return this.getRoot(layer);
  }

  /**
   * Returns a Merkle proof given an index of a leaf node
   */
  getProof(index, layer = this.leaves, proof = []) {
    // return the proof if we are at the top layer of the tree
    if (layer.length === 1) {
      return proof;
    }

    const newLayer = [];
    for (let i = 0; i < layer.length; i += 2) {
      const left = layer[i];
      const right = layer[i + 1];

      if (!right) {
        newLayer.push(left);
      } else {
        newLayer.push(this.concat(left, right));
        if (i === index || i === index - 1) {
          // if the index is even, it is the left node in its pairing
          const isLeft = index % 2 === 0;

          proof.push({
            data: isLeft ? right : left,
            left: !isLeft,
          });
        }
      }
    }

    /**
     * A Merkle tree is a binary tree, each layer combines its pairs
     * resulting in half the number of nodes. So we half our index
     * and round down, as we move up to the next layer.
     */
    return this.getProof(Math.floor(index / 2), newLayer, proof);
  }
}

module.exports = MerkleTree;
