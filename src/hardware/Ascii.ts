export class Ascii {

    // Totally stolen from:
    // https://stackoverflow.com/questions/3745666/how-to-convert-from-hex-to-ascii-in-javascript
    // Fun Fact! The only originality to this code is the '16' on line 9!


    public hex2a(hexx: number): string {
        var hex = hexx.toString(16);//force conversion
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }

    public a2hex(str: string): string {
        var arr = [];
        for (var i = 0, l = str.length; i < l; i ++) {
          var hex = Number(str.charCodeAt(i)).toString(16);
          arr.push(hex);
        }
        return arr.join('');
      }

}