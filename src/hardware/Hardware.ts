export class Hardware{

    id: number;
    name: string;
    debug = true;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public log(string: string) {
        const getCurrentTime = (): number => {
            const date = new Date();
            return date.getTime();
        };
          
          
        // Usage example:
          
        if(this.debug == true) {
            const time: number = getCurrentTime();
    
            console.log("[HW - " + this.name + " id: " + this.id + " - " + time + "]: " + string + "");
        }
    }

    public hexLog(number: number, length: number) {
        let myHex = null;
        if(number != null) {
            myHex = number.toString(16);
            myHex = myHex.toUpperCase();
            if(length > 0) {
                if (myHex.length < length) {
                    let leadingZeroes = "";
                    for(let i = 0; i < (length - myHex.length); i++) {
                        leadingZeroes = leadingZeroes + "0";
                    }
                    myHex = "0x" + leadingZeroes + myHex;
                } else if(myHex.length > length) {
                    myHex = myHex.substring(0, length);
                    myHex = "0x" + myHex;
                } else if(myHex.length == length) {
                    myHex = "0x" + myHex;
                }
            }
        } else {
            myHex = "null";
        }
        

        return myHex;
    }

}

