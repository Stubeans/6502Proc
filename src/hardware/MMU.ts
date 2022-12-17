import { Hardware } from "./Hardware";
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
        // this.writeImm(0x0000, 0xA9);
        // this.writeImm(0x0001, 0x0D);
        // this.writeImm(0x0002, 0x8D);
        // this.writeImm(0x0003, 0x50);
        // this.writeImm(0x0004, 0x00);
        // this.writeImm(0x0005, 0xA2);
        // this.writeImm(0x0006, 0x01);
        // this.writeImm(0x0007, 0xAC);
        // this.writeImm(0x0008, 0x50);
        // this.writeImm(0x0009, 0x00);
        // this.writeImm(0x000A, 0xFF);
        // this.writeImm(0x000B, 0x00);
        // this.writeImm(0x000C, 0xFF);
        // this.writeImm(0x000D, 0x00);
        // this.writeImm(0x000E, 0xEE);
        // this.writeImm(0x000F, 0x01);
        // this.writeImm(0x0010, 0x00);
        // this.writeImm(0x0011, 0xAD);
        // this.writeImm(0x0012, 0x01);
        // this.writeImm(0x0013, 0x00);
        // this.writeImm(0x0014, 0xAA);
        // this.writeImm(0x0015, 0x00);


        this.writeImm(0x0000, 0x8A);
        this.writeImm(0x0001, 0xA9);
        this.writeImm(0x0002, 0x00);
        this.writeImm(0x0003, 0x8D);
        this.writeImm(0x0004, 0x50);
        this.writeImm(0x0005, 0x00);
        this.writeImm(0x0006, 0xA9);
        this.writeImm(0x0007, 0x01);
        this.writeImm(0x0008, 0x8D);
        this.writeImm(0x0009, 0x51);
        this.writeImm(0x000A, 0x00);
        this.writeImm(0x000B, 0xA9);
        this.writeImm(0x000C, 0x01);
        this.writeImm(0x000D, 0x8D);
        this.writeImm(0x000E, 0x52);
        this.writeImm(0x000F, 0x00);
        this.writeImm(0x0010, 0xA2);
        this.writeImm(0x0011, 0x01);
        this.writeImm(0x0012, 0xAC);
        this.writeImm(0x0013, 0x50);
        this.writeImm(0x0014, 0x00);
        this.writeImm(0x0015, 0xFF);
        this.writeImm(0x0016, 0xAC);
        this.writeImm(0x0017, 0x51);
        this.writeImm(0x0018, 0x00);
        this.writeImm(0x0019, 0xFF);
        this.writeImm(0x001A, 0xAD);
        this.writeImm(0x001B, 0x51);
        this.writeImm(0x001C, 0x00);
        this.writeImm(0x001D, 0x6D);
        this.writeImm(0x001E, 0x50);
        this.writeImm(0x001F, 0x00);
        this.writeImm(0x0020, 0x8D);
        this.writeImm(0x0021, 0x52);
        this.writeImm(0x0022, 0x00);
        this.writeImm(0x0023, 0xAC);
        this.writeImm(0x0024, 0x52);
        this.writeImm(0x0025, 0x00);
        this.writeImm(0x0026, 0xA2);
        this.writeImm(0x0027, 0x01);
        this.writeImm(0x0028, 0xFF);
        this.writeImm(0x0029, 0xAD);
        this.writeImm(0x002A, 0x51);
        this.writeImm(0x002B, 0x00);
        this.writeImm(0x002C, 0x8D);
        this.writeImm(0x002D, 0x50);
        this.writeImm(0x002E, 0x00);
        this.writeImm(0x002F, 0xAD);
        this.writeImm(0x0030, 0x52);
        this.writeImm(0x0031, 0x00);
        this.writeImm(0x0032, 0x8D);
        this.writeImm(0x0033, 0x51);
        this.writeImm(0x0034, 0x00);
        this.writeImm(0x0035, 0xA2);
        this.writeImm(0x0036, 0x0D);
        this.writeImm(0x0037, 0xEC);
        this.writeImm(0x0038, 0x52);
        this.writeImm(0x0039, 0x00);
        this.writeImm(0x003A, 0xD0);
        this.writeImm(0x003B, 0xDE);
        this.writeImm(0x003C, 0x00);
        this.writeImm(0x003D, 0x00);
        this.writeImm(0x003E, 0x00);
        this.writeImm(0x003F, 0x00);
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
        this.highOrder = num;
    }

    public read() {
        this.add = (this.highOrder * 0x100) + this.lowOrder;
        return this.readImm(this.add);
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
