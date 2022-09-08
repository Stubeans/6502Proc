import { System } from "../System";
import { Hardware } from "./Hardware";

export class Memory extends Hardware {
    constructor() {
        super(0, "Memory");
        let myArr = new Array;
        for(let i = 0x00; i < 0x10000; i++) {
            myArr.push(0x00);
        }
    }
}