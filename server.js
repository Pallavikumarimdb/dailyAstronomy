const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.render('index');
})

app.post("/", function(req, res){

  const userQuery1=req.body.date;
  const url1 = "https://api.nasa.gov/planetary/apod?api_key=0EaIxc1SNCVWZvhDminI5LKyzVJc7LhPaVc26wKP&start_date="+userQuery1+"";

  https.get(url1,  function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const astronomyData = JSON.parse(data);
        const title = astronomyData[0].title;
        const explanation= astronomyData[0].explanation;
        console.log(title);
        //res.render("result", {title1: title});
        // res.write("<h1><p> Title: " + title + "</p></h1>");
        // res.write("<h3><p> Description: " + explanation + "</p></h3>");
        // res.write("<h1><p> Image: <img src='" + astronomyData[0].hdurl + "' style='width:30%' /></p></h1>");
        res.render("result", {expGet: explanation, title1: title, imgUrl:astronomyData[0].hdurl });
    })
  })

})


app.listen(3000, function() {
  console.log(" Server is up and Running on port 3000");
})













        //
        // // const temp = astronomyData.main.temp;
        // // const astronomyDescription = astronomyData.apod[0].explanation
        //  // const image = astronomyData.url;
        //
        // const imageURL = "https://apod.nasa.gov/apod/image/2201/RheaJanus_Cassini_1020.jpg";
        // // res.write("<h1><p> Astronomy Picture of the day "+imageURL+"</p></h1>");
        // // res.write("<img src="+imageURL+">");
        //
        //
        // //let html = '<p>' +imageURL +'</p>';
        // let html = '<img src="' + imageURL +'" width="500" height="500">';
        //  // html = '<img src="' + image +'" width="50" height="50">';
        // // same way we can add multiple lines
        // res.send(html)
