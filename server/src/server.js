const http = require("http");
const mongoose = require("mongoose")

const { loadPlanetsData } = require("./models/planets.model");

const app = require("./app");

const PORT = process.env.PORT || 8000;

const MONGO_URL= 'mongodb+srv://xavierarce54321:YXCzflAYtp0AfnZq@nasa.q0cnmlk.mongodb.net/?retryWrites=true&w=majority'

const server = http.createServer(app);

mongoose.connection.once('open',()=>{
  console.log('MongoDB connection ready');
})

mongoose.connection.on('error',(err)=>{
  console.error(err);
})

async function startServer() {
  await mongoose.connect(MONGO_URL)
  await loadPlanetsData();
  server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
}

startServer()