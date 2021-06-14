const WebSocket = require("ws"),
    Game = require("./Game");
class Socket extends Game {
    constructor(address, agent) {
        super();

        if (!address || !agent)
            throw new Error(`Argument ${!address ? "address" : !agent ? "agent" : ""} is empty`);
        
        let inS = null;
        let bot = 0;
        const messages = ["通心 > DM CLAN 逆冰 so noob"],
            nicknames = ["通心 > 逆冰"];

        this.socket = new WebSocket(address, { agent: agent });
        this.socket.binaryType = "arraybuffer";
        this.socket.addEventListener("open", () => {
            this.socket.send(JSON.stringify([nicknames[Math.floor(Math.random() * nicknames.length)], this.screen.width, this.screen.height, this.version, this.generateToken(), "", 0, 0, 0, 0, 0, 1, 0, 0, 0, null]));
            bot = bot+1;
        });
    
        this.socket.addEventListener("message", message => {
            bot++
            let parsedMessage;

            switch (typeof message.data) {
                case "string":
                    parsedMessage = JSON.parse(message.data);

                    switch (parsedMessage[0]) {
                        case 3:
                            let top_right = 10; // правый вверх
                            let top_left = 9;  // левый вверх
                            let top = 8; // вверх
                            let bottom_left = 5; // вниз налево
                            let bottom_right = 6; // вниз право
                            let bottom = 4; // вниз
                            let right = 2; // направо
                            let left = 1; // налево
                            console.log(`[Xr1dBots] bots on server: ${bot}`);
                            bot++
                            const player_limit =1;
                            const player_id = 10;


                            
                           setTimeout(() => {
                                this.socket.send(new Uint8Array([2, top]));
                                }, 1250)
                                setTimeout(() => {
                                this.socket.send(new Uint8Array([2, left]));
                                }, 3750)
                                setTimeout(() => {
                                this.socket.send(new Uint8Array([2, bottom_right]));
                                }, 7000)
                                setTimeout(() => {
                                    this.socket.send(new Uint8Array([2, left]));
                                }, 7400)
                                setInterval(() => {
                                    this.socket.send(JSON.stringify([6, 89]));
                                }, 100)
                                setInterval(() => {
                                    this.socket.send(JSON.stringify([6, 104]));
                                }, 100)
                                setInterval(() => {
                                    this.socket.send(JSON.stringify([6, 28]));
                                }, 100)
                                setInterval(() => {
                                    this.socket.send(JSON.stringify([6, 122]));
                                }, 100)
                            inS = setInterval(() => {
                               
                                this.socket.send(JSON.stringify([0, messages[Math.floor(Math.random() * messages.length)]]));
                                
                                
                                bot = bot + 1;
                            }, 2500);
                            break;
                    }
                    break;
                case "object":
                    parsedMessage = new Uint8Array(message.data);

                    switch (parsedMessage[0]) {
                        case 25:
                            if (inS && inS !== null)
                                clearInterval(inS), inS = null;
                            break;
                    }
                    break;
            }
        });
        this.socket.addEventListener("error", _ => {});
    }

    get instance() {
        if (this.socket)
            return this.socket;

        return null;
    }
}

module.exports = Socket;
