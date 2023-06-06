const signaturePromise = require('./signaturePromise');
const { utils } = require('ethers');

describe('signaturePromise', () => {
  it('should be an instance of Promise', () => {
    expect(signaturePromise).toBeInstanceOf(Promise);
  });

  it('should resolve with a hexadecimal representation of the transaction', async () => {
    const hex = await signaturePromise;
    const matches = /^0x[0-9A-Fa-f]*$/.test(hex);
    if (!matches) console.log(hex);
    expect(matches).toBe(true);
  });

  describe('parsed properties', () => {
    let parsed;
    beforeEach(async () => {
      const hex = await signaturePromise;
      parsed = utils.parseTransaction(hex);
    });

    it('should contain the to address', () => {
      expect(parsed.to).toBe('0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92');
    });

    it('should contain the value', () => {
      expect(parsed.value.toString()).toBe('1000000000000000000');
    });

    it('should have the appropriate gas limit for transfers', () => {
      expect(parsed.gasLimit.eq(21000)).toBe(true);
    });

    it('should derive the from address', () => {
      expect(parsed.from).toBe('0x5409ED021D9299bf6814279A6A1411A7e866A631');
    });
  });
});
