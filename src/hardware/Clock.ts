import {Hardware} from "./Hardware";
import { ClockListener } from "./imp/ClockListener";

export class Clock extends Hardware implements ClockListener {
    
    cl: ClockListener[] = new Array();

    public pulse(): void {
        
    }

    constructor() {
        super(0, "Clock");
    }

    public addListener(listener: ClockListener) {
        this.log(listener + " Pushed");
        this.cl.push(listener);
    }

    public startClock(interval:number) {
          
        setInterval( () => {
            if(this.cl.length > 0) {
                for(let i = 0; i < this.cl.length; i++) {
                    this.cl[i].pulse();
                }
            }
        }, interval);
    }
}
