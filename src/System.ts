// import statements for hardware
import {Cpu} from "./hardware/Cpu";
import{Hardware} from "./hardware/Hardware";
import { Memory } from "./hardware/Memory";
import { Clock } from "./hardware/Clock";

/*
    Constants
 */
// Initialization Parameters for Hardware
// Clock cycle interval
const CLOCK_INTERVAL= 500;               // This is in ms (milliseconds) so 1000 = 1 second, 100 = 1/10 second
                                        // A setting of 100 is equivalent to 10hz, 1 would be 1,000hz or 1khz,
                                        // .001 would be 1,000,000 or 1mhz. Obviously you will want to keep this
                                        // small, I recommend a setting of 100, if you want to slow things down
                                        // make it larger.


export class System extends Hardware{

    private _CPU : Cpu = null;
    private _MEMORY : Memory = null;
    private _CLOCK : Clock = null;
    
    public running: boolean = false;

    constructor() {
        
        super(0, "System");


        this._CPU = new Cpu();
        this._MEMORY = new Memory();
        this._CLOCK = new Clock();
        
        /*
        Start the system (Analogous to pressing the power button and having voltages flow through the components)
        When power is applied to the system clock, it begins sending pulses to all clock observing hardware
        components so they can act on each clock cycle.
         */

        this.startSystem();

    }

    public startSystem(): boolean {
        this.log("created");
        this._CPU.log("created");
        this._MEMORY.log("created");
        this._CLOCK.log("created");
        this._MEMORY.displayMemory(0x00, 0x14);
        this._CLOCK.addListener(this._CPU);
        this._CLOCK.addListener(this._MEMORY);
        this._CLOCK.startClock(CLOCK_INTERVAL);
        return true;
    }

    public stopSystem(): boolean {

        return false;

    }
}

let system: System = new System();
