class Game {
    constructor() {
        this.version = 52;
        this.screen = {
            width: 2120,
            height: 1400
        };
        
    }

    generateToken(tokenLength = 14) {
        let token = "";

        for (let i = 0; i < tokenLength; i++)
            token += String.fromCharCode(48 + Math.floor(74 * Math.random()));

        return token;
    }
}

module.exports = Game;