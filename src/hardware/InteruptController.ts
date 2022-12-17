import {Hardware} from "./Hardware";
import { ClockListener } from "./imp/ClockListener";
import { Keyboard } from "./Keyboard";

export class InteruptController extends Hardware implements ClockListener{

    deviceArr: Array<Hardware>;
    interuptArr: Array<number>;

    constructor() {
        super(0, "InteruptController");
        this.deviceArr = new Array;
        this.interuptArr = new Array;
    }

    public pulse(): void {
        // More details on this in the coming steps!
    }

    public addHardware(addHardware:Hardware) {
        this.deviceArr.push(addHardware);
    }

    public addInterrupt(_interrupt:number) {
        this.interuptArr.push(_interrupt);
    }

}