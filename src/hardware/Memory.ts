import { System } from "../System";
import { Hardware } from "./Hardware";

export class Memory extends Hardware {

    memArr: Array<number>;

    constructor() {
        super(0, "Memory");
        this.memArr = this.initializeArray();
    }

    public initializeArray() {
        let myArr = new Array;
        for(let i = 0x00; i < 0x10000; i++) {
            myArr.push(0x00);
        }
        return myArr;
    }

    public displayMemory(number1: number, number2: number) {
        for(let i = number1; i < (number2 + 1); i++) {
            try {
                if(this.memArr[i] == null) {
                    this.log("Address : " + this.hexLog(i, 5) + " Contains Value: ERR [hexValue conversion]: number undefined");
                } else if(this.memArr[i] != null) {
                    this.log("Address : " + this.hexLog(i, 5) + " Contains Value: " + this.hexLog(this.memArr[i], 2));
                }
            } catch(e) {
                let error = (e as Error).message;
                this.log("Address : " + this.hexLog(i, 5) + " Contains Value: ERR " + error);
            }
        }
    }
}