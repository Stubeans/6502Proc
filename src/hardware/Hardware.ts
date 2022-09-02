import { time } from "console";

export class Hardware {

    id: number;
    name: string;
    debug = true;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public log(string) {
        const getCurrentTime = (): number => {
            const date = new Date();
            return date.getTime();
        };
          
          
        // Usage example:
          
        const time: number = getCurrentTime();
    
        console.log("[HW - " + this.name + " id: " + this.id + " - " + time + "]: " + string + "");
    }

}

