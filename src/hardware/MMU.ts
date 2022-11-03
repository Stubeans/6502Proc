import { Console } from "console";
import { System } from "../System";
import {Hardware} from "./Hardware";
import { ClockListener } from "./imp/ClockListener";

export class MMU extends Hardware implements ClockListener{

    public pulse(): void {
        this.log("received clock pulse");
    }

    constructor() {
        super(0, "MMU");
    }
}
