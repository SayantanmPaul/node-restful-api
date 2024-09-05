const { nanoid } = require('nanoid');
const URL = require("../models/url");

const handleGenerateShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required!" });

  const urlId = nanoid(10);

  await URL.create({
    shortId: urlId,
    rediretUrl: body.url,
    visitedHistory: []
  });

  return res.json({ status: 'success', id: urlId });
}

const handleGetAnalytics= async(req, res)=>{
  const shortId = req.params.shortId;
  const results= await URL.findOne({ shortId });
  return res.json({
    totalClicks: results.visitHistroy.length,
    analycis: results.visitHistroy
  })
}

module.exports = {
  handleGenerateShortUrl,
  handleGetAnalytics
}
