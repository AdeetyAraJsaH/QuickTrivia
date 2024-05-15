import mongoose from 'mongoose'

const connectDB = async () => {

    await mongoose.connect(process.env.MONGO_URI)
        .then(res => {
            console.log(`Database Connected : ${res.connection.host}`);
        })
        .catch((err) => {
            console.error(`error:${err.message}`);
            process.exit(1);
        })

}

export default connectDB