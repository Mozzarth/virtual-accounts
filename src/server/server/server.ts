import express, { Application } from "express";
import { CONFIG } from "../config/config";

export class Server {

    private static instance: Server
    public app: Application;

    private port: number
    // private host: string

    private constructor() {
        this.app = express();
        this.port = Number(CONFIG.PORT);
        // this.host = CONFIG.HOST
    }

    public static get getInstance() {
        return this.instance || (this.instance = new this())
    }

    public async start() : Promise<void> {
        try {
            return new Promise((res,rej)=>{
                this.app.listen(Number(this.port), () => {
                    // console.log(`Server running on http://${this.host}:${this.port}`)
                    console.log(`Server running on http://localhost:${this.port}`)
                    res()
              })
            })
        } catch (error) { throw error }
    }


}
