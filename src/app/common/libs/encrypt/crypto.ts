import { IEncriptDecrypt } from "./IEncrypt.decript";
import { CONFIG } from "../../config/config";
import crypto from 'crypto-js';


export class EncoderCrypto implements IEncriptDecrypt {


    constructor() {
    }

    async encrypt(text: string): Promise<string> {
        try {
            const cipher = crypto.AES.encrypt(text, CONFIG.SECRET_FOR_ENCRYPTION);
            return cipher.toString();
        } catch (error) {
            throw error
        }
    }
    async decrypt(hash: string): Promise<string> {
        try {
            const bytes = crypto.AES.decrypt(hash, CONFIG.SECRET_FOR_ENCRYPTION);
            const originalText = bytes.toString(crypto.enc.Utf8);
            return originalText;
        } catch (error) {
            throw error
        }
    }
}

const encoderCrypto = new EncoderCrypto();
export { encoderCrypto }