const mongoose =require('mongoose');
const mongooseURI='mongodb://0.0.0.0:27017/inotebook';

const connectToMongo= async()=>{
  try {
    const conn = await mongoose.connect(mongooseURI, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
module.exports = connectToMongo;