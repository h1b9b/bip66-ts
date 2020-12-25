import { valid, invalid } from './fixtures.json'
import * as bip66 from '..'

describe('bip66', () => {
  describe('check', () => {
    valid.forEach(({ DER }) => {
      it(`should return true for ${DER}`, () => {
        expect(bip66.check(Buffer.from(DER, 'hex'))).toBe(true);
      });
    })
  });

  describe('decode', () => {
    valid.forEach(({ DER, r, s }) => {
      it(`should successfully decode ${DER}`, () => {
        const signature = bip66.decode(Buffer.from(DER, 'hex'));
        expect(signature.r.toString('hex')).toBe(r);
        expect(signature.s.toString('hex')).toBe(s);
      });
    });

    invalid.decode.forEach(({ DER, exception }) => {
      it(`should throw "${exception}"`, () => {
        expect(() => bip66.decode(Buffer.from(DER, 'hex'))).toThrow(exception);
      });
    });
  });

  describe('encode', () => {
    valid.forEach(({ DER, r, s }) => {
      it(`should successfully encode r:${r} // s:${s}`, () => {
        const encoded = bip66.encode(Buffer.from(r, 'hex'), Buffer.from(s, 'hex'));
        expect(encoded.toString('hex')).toBe(DER);
      });
    });

    invalid.encode.forEach(({ r, s, exception }) => {
      it(`should throw "${exception}"`, () => {
        expect(() => bip66.encode(Buffer.from(r, 'hex'), Buffer.from(s, 'hex'))).toThrow(exception);
      });
    });
  });
})
