import {Hardware} from "./Hardware";
import { ClockListener } from "./imp/ClockListener";
import { MMU } from "./MMU";

export class Cpu extends Hardware implements ClockListener{

    cpuClockCount: number = 0;

    public pulse(): void {
        this.log("received clock pulse - CPU Clock Count: " + this.cpuClockCount);
        this.cpuClockCount++;
    }

    constructor() {
        super(0, "Cpu");
    }
}
