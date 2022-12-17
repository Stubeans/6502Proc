import {Hardware} from "./Hardware";
import { ClockListener } from "./imp/ClockListener";
import { MMU } from "./MMU";

export class Cpu extends Hardware implements ClockListener{

    _MMU: MMU = null;
    cpuClockCount: number = 0;
    mode: number = 0;
    instructionRegister: number = null;
    step: number = 0;
    programCounter: number = 0x0000;
    accumulator: number = 0x00;
    xReg: number = 0x00;
    yReg: number = 0x00;
    zFlag: number = 0;
    mbr: number = 0x00; // Memory Buffer Register
    opCode: number = null;
    carryFlag: number = 0;

    public pulse(): void {
        //this.log("received clock pulse - CPU Clock Count: " + this.cpuClockCount);
        this.log("CPU State | Mode: " + this.mode + " PC: " + this.hexLog(this.programCounter, 4) + " IR: " + this.hexLog(this.instructionRegister, 2) + " Acc: " + this.hexLog(this.accumulator, 2) + " xReg: " + this.hexLog(this.xReg, 2) + " yReg: " + this.hexLog(this.yReg, 2) + " zFlag: " + this.zFlag + " Step: " + this.step);
        this.cpuClockCount++;
        if(this.instructionRegister == null) {
            this.fetch();
        } else if(this.step == 1 || this.step == 2) {
            this.decode();
        } else if(this.step == 3 || this.step == 4) {
            this.execute();
        } else if(this.step == 5) {
            this.writeBack();
        } else if(this.step == 6) {
            this.interuptCheck();
        }
    }

    constructor(MMU: MMU) {
        super(0, "Cpu");
        this._MMU = MMU;
    }

    private fetch() {
        this.instructionRegister = this.readPC();
        this.opCode = this.instructionRegister;
        this.incCounters();
    }

    private decode() {
        if (this.opCode == 0xA9 || this.opCode == 0xA2 || this.opCode == 0xA0 || this.opCode == 0xD0) { // All the functions that need to load the next spot in memory
            this.mbr = this.readPC();
            this.step = 3;
            this.programCounter++;
        } else if (this.opCode == 0xAD || this.opCode == 0xEE || this.opCode == 0xEC || this.opCode == 0xAC || this.opCode == 0xAE || this.opCode == 0x6D || this.opCode == 0x8D) { // All the functions that need to load the high and low order bytes
            if(this.step == 1) {
                this._MMU.setLow(this.readPC());
                this.incCounters();
            } else if(this.step == 2) {
                this._MMU.setHigh(this.readPC());
                this.incCounters();
            }
        } else if (this.opCode == 0x8A || this.opCode == 0x98 || this.opCode == 0xAA || this.opCode == 0xA8 || this.opCode == 0xEA || this.opCode == 0x00 || this.opCode == 0xFF) { // All the functions that don't need to decode anything
            this.step = 3;
        }
    }

    private execute() {
        if (this.opCode == 0xA9) { //Loads the accumulator with a constant mbr
            this.accumulator = this.mbr;
            this.step = 6;
        } else if (this.opCode == 0xAD) { //Load the accumulator from memory : LDA : AD 10 00 <- loads mem at add 0x10 into acc
            this.accumulator = this._MMU.read();
            this.step = 6;
        } else if (this.opCode == 0x8D) { //Store the accumulator in memory : STA : 8D 10 00 <- stores acc into mem at add 0x10
            this.step = 5;
        } else if (this.opCode == 0x8A) { //Load the accumulator from X register : TXA : 8A
            this.accumulator = this.xReg;
            this.step = 6;
        } else if (this.opCode == 0x98) { //Load the accumulator from Y register : TYA : 98
            this.accumulator = this.yReg;
            this.step = 6;
        } else if (this.opCode == 0x6D) { //Add with carry:Adds contents of an address to the accumulator and keeps the result in the accumulator : ADC : 6D 10 00
            this.accumulator = this.accumulator + this._MMU.read();
            if(this.accumulator >= 0x100) {
                this.accumulator = this.accumulator - (this.accumulator % 0x100);
                this.carryFlag = 1;
            }
            this.step = 6;
        } else if (this.opCode == 0xA2) { //Load the X register with a constant : LDX : A2 01
            this.xReg = this.mbr;
            this.step = 6;
        } else if (this.opCode == 0xAE) { //Load the X register from memory : LDX : AE 10 00
            this.xReg = this._MMU.read();
            this.step = 6;
        } else if (this.opCode == 0xAA) { //Load the X register from the accumulator : TAX : AA
            this.xReg = this.accumulator;
            this.step = 6;
        } else if (this.opCode == 0xA0) { //Load the Y register with a constant : LDY : A0 04
            this.yReg = this.mbr;
            this.step = 6;
        } else if (this.opCode == 0xAC) { //Load the Y register from memory : LDY : AC 10 00
            this.yReg = this._MMU.read();
            this.step = 6;
        } else if (this.opCode == 0xA8) { //Load the Y register from the accumulator : TAY : A8
            this.yReg = this.accumulator;
            this.step = 6;
        } else if (this.opCode == 0xEA) { //No Operation : NOP : EA
            this.step = 6;
        } else if (this.opCode == 0x00) { //Break : BRK : 00
            process.exit();
        } else if (this.opCode == 0xEC) { //Compare a byte in memory to the X reg. Sets the Z (zero) flag if equal : CPX : EC 10 00
            if(this._MMU.read() == this.xReg) { 
                this.zFlag = 1;
            } else {
                this.zFlag = 0;
            }
            this.step = 6;
        } else if (this.opCode == 0xD0) { //Branch n bytes if Z flag = 0 : BNE : D0 EF
            if(this.zFlag == 0) {
                this.programCounter = this.programCounter + (this.twosCompliment(this.mbr));
            }
            this.step = 6;
        } else if (this.opCode == 0xEE) { //Increment the value of a byte : INC : EE 21 00
            if(this.step == 3) {
                this.accumulator = this._MMU.read();
                this.step++;
            } else if(this.step == 4) {
                this.accumulator++;
                this.step++;
            }
        } else if (this.opCode == 0xFF) { //System Call : SYS : FF
            if(this.xReg == 0x01) {
                process.stdout.write(this.hexLog(this.yReg, 2));
            } else if(this.xReg == 0x02) {
                //TODO Print the 0x00 terminated string stored at address in the Y register
            }
            this.step = 6;
        }
    }

    private writeBack() {
        if(this.opCode == 0xEE || this.opCode == 0x8D) {
            this._MMU.write(this.accumulator);
            this.step++;
        }
    }

    private interuptCheck() {
        this.resetInstruction();
    }

    private resetInstruction() {
        this.step = 0;
        this.instructionRegister = null;
        this.opCode = null;
    }

    private incCounters() {
        this.step++;
        this.programCounter++;
    }

    private readPC() {
        return this._MMU.readImm(this.programCounter);
    }

    private twosCompliment(input:number) {
        if(input <= 127) {
            return input;
        } else if(input >= 128) {
            input = -1 * (input - (2 * (input - 128)));
            return input;
        }
        return input;
    }
}
    
// 0xA9 Load the accumulator with a constant : LDA : A9 07 <- loads 07 into the accumulator

// 0xAD Load the accumulator from memory : LDA : AD 10 00 <- loads mem at add 0x10 into acc

// 0x8D Store the accumulator in memory : STA : 8D 10 00 <- stores acc into mem at add 0x10
    
// 0x8A Load the accumulator from X register : TXA : 8A
            
// 0x98 Load the accumulator from Y register : TYA : 98
    
// 0x6D Add with carry:Adds contents of an address to the accumulator and keeps the result in the accumulator : ADC : 6D 10 00
    
// 0xA2 Load the X register with a constant : LDX : A2 01
    
// 0xAE Load the X register from memory : LDX : AE 10 00
    
// 0xAA Load the X register from the accumulator : TAX : AA
    
// 0xA0 Load the Y register with a constant : LDY : A0 04
    
// 0xAC Load the Y register from memory : LDY : AC 10 00
    
// 0xA8 Load the Y register from the accumulator : TAY : A8

// 0xEA No Operation : NOP : EA

// 0x00 Break : BRK : 00
    
// 0xEC Compare a byte in memory to the X reg. Sets the Z (zero) flag if equal : CPX : EC 10 00
    
// 0xD0 Branch n bytes if Z flag = 0 : BNE : D0 EF
    
// 0xEE Increment the value of a byte : INC : EE 21 00
    
// 0xFF System Call : SYS : FF
