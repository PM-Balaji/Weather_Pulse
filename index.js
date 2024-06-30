import express from "express";
import axios from "axios";
import bodyParser from "body-parser"

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index.html");
});

app.post("/weather", async(req, res) => {

    const result = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + req.body.city +"&units=metric&appid=1a9d0eff3324803274c33d35585b9382");

    const ans = await axios.get("http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=" + result.data.coord.lat + "&lon=" + result.data.coord.lon + "&appid=1a9d0eff3324803274c33d35585b9382")

    const date = new Date(ans.data.list[0].dt * 1000);

    const formattedDate = date.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const City = req.body.city;
    res.render("index.ejs",{
        city: City.toUpperCase(),
        temp: result.data.main.temp,
        feels_like: result.data.main.feels_like,
        pressure: result.data.main.pressure,
        humidity: result.data.main.humidity,
        wind_speed: result.data.wind.speed,
        wind_dir: result.data.wind.deg,
        aqi: ans.data.list[0].main.aqi,
        co: ans.data.list[0].components.co,
        no2: ans.data.list[0].components.no2,
        so2: ans.data.list[0].components.so2,
        nh3: ans.data.list[0].components.nh3,
        date: formattedDate,
    });
    
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




