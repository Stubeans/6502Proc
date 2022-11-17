import {Hardware} from "./Hardware";
import { Cpu } from "./Cpu";
import { Memory } from "./Memory";

export class MMU extends Hardware{

    private _MEMORY : Memory = null;
    private lowOrder : number = 0x00;
    private highOrder : number = 0x00;
    private add : number = 0x0000;

    constructor(MEMORY: Memory) {
        super(0, "MMU");
        this._MEMORY = MEMORY;
        this.writeImm(0x0000, 0xA9);
        this.writeImm(0x0001, 0x0D);
        this.writeImm(0x0002, 0xA9);
        this.writeImm(0x0003, 0x1D);
        this.writeImm(0x0004, 0xA9);
        this.writeImm(0x0005, 0x2D);
        this.writeImm(0x0006, 0xA9);
        this.writeImm(0x0007, 0x3F);
        this.writeImm(0x0008, 0xA9);
        this.writeImm(0x0009, 0xFF);
        this.writeImm(0x000A, 0x00);
    }

    public getLow() {
        return this.lowOrder;
    }

    public setLow(num: number) {
        this.lowOrder = num;
    }

    public getHigh() {
        return this.highOrder;
    }

    public setHigh(num: number) {
        this.lowOrder = num;
    }

    public read() {
        this.add = (this.highOrder * 0x100) + this.lowOrder;
        this.readImm(this.add);
    }

    public write(data: number) {
        this.add = (this.highOrder * 0x100) + this.lowOrder;
        this.writeImm(this.add, data);
    }

    public readImm(addr: number) {
        this.setMar(addr);
        this._MEMORY.read();
        return this.getMdr();
    }

    public writeImm(addr: number, data: number) {
        this.setMar(addr);
        this.setMdr(data);
        this._MEMORY.write();
    }

    public setMar(add: number) {
        this._MEMORY.setMar(add);
    }

    public getMar() {
        return this._MEMORY.getMar();
    }

    public setMdr(add: number) {
        this._MEMORY.setMdr(add);
    }
    
    public getMdr() {
        return this._MEMORY.getMdr();
    }
}
