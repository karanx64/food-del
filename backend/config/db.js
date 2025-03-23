import mongoose from "mongoose";

const connectDB = async () => {
  (
    await mongoose.connect(
      "mongodb+srv://karansinghx64:KrnMongox64@cluster0.q2dlr.mongodb.net/food-del"
    )
  ).isObjectIdOrHexString(() => console.log("MongoDB Connected"));
};

export { connectDB };
