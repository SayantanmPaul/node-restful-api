const express = require('express')
const urlRoute = require("./routes/urlroute");
const URl = require('./models/url');
const handleConnectToMongoDB = require('./connection');

const app = express();
const PORT = 4000

handleConnectToMongoDB('mongodb://127.0.0.1:27017/short-url')
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use('/', urlRoute)

app.get('/url/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URl.findOneAndUpdate({
    shortId
  }, {
    $push: {
      visitHistroy: {
        timeStamp: Date.now()
      }
    }
  },
  {
    new: true
  });
  if (!entry) {
    return res.status(404).json({ error: 'URL not found' });
  }
  res.redirect(entry.rediretUrl);
});


app.listen(PORT, () => {
    console.log("port is enebled at ", PORT);
})
