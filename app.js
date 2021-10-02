const express = require('express')
const axios = require("axios");
const app = express()
const port = 2323

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/img', express.static(__dirname + 'public/img'))  // for image files
app.use('/js', express.static(__dirname + 'public/js'))

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.get('/api/:version', function(req, res) {
  res.send(req.params.version);
});


app.get("/check/:email", async function(req, res) {
  try {
    const API_ACC_KEY = "f6fab6c0cc68d314f840adfdec1250f3";

    const emailData = await axios.get(
      `http://apilayer.net/api/check?access_key=${API_ACC_KEY}&email=${req.params.email}&smtp=1&format=1`
    );

    res.render("mailboxLayer", { info: emailData.data });
      
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
});

app.get('/', (req, res) => res.send('Index Page'))

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.listen(port, () => console.log(`Running on ${port} port`))