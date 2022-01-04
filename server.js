const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extebded: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){

  const userQuery1=req.body.dateInput;
  const url = "https://api.nasa.gov/planetary/apod?api_key=0EaIxc1SNCVWZvhDminI5LKyzVJc7LhPaVc26wKP&start_date="+"userQuery1"

  https.get(url,  function(responce){
    console.log(responce.statusCode);

    responce.on("data", function(data){
      const astronomyData = JSON.parse(data);
      // const temp = astronomyData.main.temp;
      // const astronomyDescription = astronomyData.apod[0].explanation
      // const image = astronomyData.apod[0].url

      const imageURL = "https://apod.nasa.gov/apod/image/2201/RheaJanus_Cassini_1020.jpg"
      res.write("<h1><p> Astronomy Picture of the day "+imageURL+"</p></h1>");
      // res.write("<img src="image">");
      res.send()
    })
  })

})


app.listen(3000, function() {
  console.log(" Server is up and Running on port 3000");
})
