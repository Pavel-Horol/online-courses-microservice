import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import router from './router/getaway-router';
import errorMiddleware from './middleware/error-middleware';
import cookieParser from 'cookie-parser';
import cors from 'cors'
const port = process.env.PORT || 3000;
const app: Application = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
	credentials: true
}))

app.use('/api', router)

//@ts-ignore
app.use(errorMiddleware)

const start = async () => {
	try {
		app.listen(port, () => {
			console.log(`Getaway server is Fire at http://localhost:${port}`);
		});
	} catch (error) {
		console.error(error);
	}
};

start();
