

export interface IEncriptDecrypt {

    encrypt(text: string): Promise<string>
    decrypt(hash: string): Promise<string>

}