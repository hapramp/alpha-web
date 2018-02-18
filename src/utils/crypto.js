import sjcl from 'sjcl';

// https://stackoverflow.com/a/48738430/5628527
export const sha256 = input => sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(input));
