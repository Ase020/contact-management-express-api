import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    const connect = await mongoose.connect(
      "mongodb+srv://felix5olali:lHqCa7JzoEXGftV5@contact-api.2ccufin.mongodb.net/myContactApp?retryWrites=true&w=majority"
    );
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectDb };
