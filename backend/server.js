import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import userRoutes from './routes/userRoutes.js'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

const app = express();
app.use(cors());
app.use(cors({origin:process.env.CLIENT_PORT}))
connectDB();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api/users', userRoutes);
app.get('/', (req, res) => { res.send('Server is ready.') });
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on ${port}`))