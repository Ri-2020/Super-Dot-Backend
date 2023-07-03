import mongoose from "mongoose";

const connectDB = async(USERNAME , PASSWORD)=>{
    // const url = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.lxtz5es.mongodb.net/?retryWrites=true&w=majority`
    const url = 'mongodb://localhost:27017';
    try{
        console.log("ConnectDB: trying to connect DB")
        const DB_OPTIONS = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            DbName: "mini-project",
          };
          await mongoose.connect(url, DB_OPTIONS);
          console.log("ConnectDB: Database connected Successfully")
    }catch(e){
        console.log("ConnectDB: "+ e);
    }
}

export default connectDB;