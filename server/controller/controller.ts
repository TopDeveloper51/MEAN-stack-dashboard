const mongodbUrl = "mongodb+srv://dbUser:vitalii700!@cluster0.ynhaxac.mongodb.net/test" //please replace with "mongodb://localhost:27017"
const databaseName = "angular_dashboard"; //please replace database name
const collectionName = "user_upload"; //please replace collection name
const mongo = require('express').Router();
const mongodb = require("mongodb");
const fm_mongo_connector = require("flexmonster-mongo-connector");
let dbo = null;
let _apiReference = null; // it'll be the Connector instance

// Define the config for the Connector
let config = {
    cacheEnabled: true,
    cacheMemoryLimit: 100,
    cacheTimeToLive: 120,
    logsEnabled: true
};

mongodb.MongoClient.connect(
  mongodbUrl, // given by MongoDb Atlas as a connection option
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  },
  (err, db) => {
    if (err)
        throw err;
    dbo = db.db(databaseName);
      // Pass the config to the Connector
    _apiReference = new fm_mongo_connector.MongoDataAPI(config);
    // getresult();
  }
);

async function getresult() {
  const result = await _apiReference.getSelectResult(dbo, collectionName);
      console.log('result----', result);
}


// requests handling functions will appear here
mongo.post("/fields", async (req, res) => {
  try {
      const result = await _apiReference.getSchema(dbo, req.body.index);
      res.json(result);
  } catch (err) {
      //your error handler
  }
});

mongo.post("/members", async (req, res) => {
  try {
      const result = await _apiReference.getMembers(
          dbo,
          req.body.index,
          { field: req.body.field },
          { page: req.body.page, pageToken: req.body.pageToken }
      );
      res.json(result);
  } catch (err) {
      //your error handler
  }
});

mongo.post("/select", async (req, res) => {
  try {
      const result = await _apiReference.getSelectResult(
          dbo, req.body.index, req.body.query,
          { page: req.body.page, pageToken: req.body.pageToken });
      res.json(result);
  } catch (err) {
    //your error handler
  }
});

mongo.post("/handshake", async (req, res) => {
  try {
    res.json({ version: _apiReference.API_VERSION });
  } catch (err) {
     handleError(err, res);
  }
});

module.exports = mongo;
