import {Hardware} from "./Hardware";

export class Keyboard extends Hardware{
    IRQ: number;
    Priority: number;
    Name: string = "Keyboard";
    InputBuffer: Array<number>;
    OutputBuffer: Array<number>;

    constructor(IRQ_:number, Priority_:number) {
        super(0, "Keyboard");
        this.InputBuffer = new Array;
        this.OutputBuffer = new Array;
        this.IRQ = IRQ_;
        this.Priority = Priority_;
    }
}