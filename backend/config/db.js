import mongoose from 'mongoose'

const connectDB = async () => {

    const conn = await mongoose.connect(process.env.MONGO_URI)
        .then(res => {
            console.log(`Database Connected : ${conn.connection.host}`);
            console.log(`Database Connected : ${res}`);
        })
        .catch((err) => {
            console.error(`error:${err.message}`);
            process.exit(1);
        })

}

export default connectDB