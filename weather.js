const http = require("http");
const fs = require("fs");
const requests = require("requests");

const replaceVal = (temval,orival) => {
     let temperature = temval.replace("{%tempval%}", orival.main.temp);
     temperature = temperature.replace("{%tempmin%}",orival.main.temp_min);
     temperature = temperature.replace("{%tempmax%}",orival.main.temp_max);
     temperature = temperature.replace("{%location%}",orival.name);
     temperature = temperature.replace("{%country%}",orival.sys.country);
     return temperature;
};


const homeFile = fs.readFileSync("weather.html", "utf-8");
const server = http.createServer((req,res) => {
    
    if(req.url == "/")
    {
      requests('https://api.openweathermap.org/data/2.5/weather?q=Jaipur&appid=e69fc231f6a1da96c32aaf2385895fc7')
      .on('data',  (chunk) => {
          const onbData = JSON.parse(chunk);
          const arrdata = [onbData];
          //console.log(arrdata[0].main.temp);
          const realdata = arrdata.map((val) => replaceVal(homeFile,val)).join("");
          res.write(realdata);
          //console.log(realdata);
    })
    .on('end', (err) => {
      if (err) return console.log('connection closed due to errors', err);
       
      res.end();
    });
    }   
});

server.listen(500,"127.0.0.1");