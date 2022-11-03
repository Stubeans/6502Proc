import { System } from "../System";
import { Hardware } from "./Hardware";
import { ClockListener } from "./imp/ClockListener";

export class Memory extends Hardware implements ClockListener{

    memArr: Array<number>;
    private mar: number = 0x0000;
    private mdr: number = 0x00;

    public pulse(): void {
        this.log("received clock pulse");
    }

    constructor() {
        super(0, "Memory");
        this.memArr = this.initializeArray();
        this.log("Created - Addressable space : 65536");
    }

    public initializeArray() {
        let myArr = new Array;
        for(let i = 0x00; i < 0x10000; i++) {
            myArr.push(0x00);
        }
        return myArr;
    }

    public reset() {
        for(let i = 0x00; i < 0x10000; i++) {
            this.memArr[i] = 0x00;
        }
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

    //This method will read memory at the location in the MAR and update the MDR
    public read() {
        this.mdr = this.memArr[this.mar];
    }

    //This method should write the contents of the MDR to memory at the location indicated by the MAR.
    public write() {
        this.memArr[this.mar] = this.mdr;
    }

    //MDR and MAR get setters
    public getMar() {
        return this.mar;
    }

    public setMar(num: number) {
        this.mar = num;
    }

    public getMdr() {
        return this.mdr;
    }

    public setMdr(num: number) {
        this.mdr = num;
    }
}