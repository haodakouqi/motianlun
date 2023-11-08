// tslint:disable
//

import RSAUtil from './RSAUtil';
import AESUtil from './AESUtil';



export const encryptParams = (params, publicKey?) => {
  const _publicKey = publicKey || 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKXnXZck3gpFiEcU6rUC+YN9A0UdOGAdq9uS06iQ/IPDrS0o6jADLoR9Fit94XewTQIyb/64inQ9KXG4Eb5QcRMCAwEAAQ=='
  let aesKey = AESUtil.createAesKey()
  let aesCBCIV = '0612ckxm6ljkfo4b'
  // let encryptedData = AESUtil.encryptByECB(params, aesKey)
  let encryptedData = AESUtil.encryptByCBC(params, aesKey, aesCBCIV)
  let encryptedAesKey = RSAUtil.publicEncrypt(aesKey, _publicKey)
  return {
    encryptedData,
    encryptedAesKey
  }
}
