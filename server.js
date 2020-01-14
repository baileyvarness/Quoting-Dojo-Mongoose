const express = require("express");
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/quotingDojoDB', {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }))

const QuoteSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      quote: {
        type: String,
        required: true
      }
    },
    { timestamps: true }
  )

  const Quote = mongoose.model("Quote", QuoteSchema)


app.get("/", (req, res) => {
    Quote.find()
    // .sort({ _id: -1 })
    .then(quotes => {
        console.log(quotes)
        res.render("index", { quotes })
    })
    .catch(err => {
        console.log(err)
        res.render("index", { quotes: [] })
    })
})

app.post("/quotes", (req, res) => {
    Quote.create(req.body)
      .catch(err => {
        console.log(err)
      })
      .finally(() => res.redirect("/quotes"))
})

app.get("/quotes", (req, res) => {
    Quote.find()
    .sort({ _id: -1 })
    .then(quotes => {
        console.log(quotes)
        res.render("quotes", { quotes })
    })
    .catch(err => {
        console.log(err)
        res.render("quotes", { quotes: [] })
    })
})




app.listen(8000, () => console.log("listening on port 8000"));
