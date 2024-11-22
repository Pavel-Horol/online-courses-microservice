import dotenv from 'dotenv';
dotenv.config();


import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import router from './routes/auth-router';
import errorMiddleware from './middleware/error-middleware';

const port = process.env.PORT || 3001;
const app: Application = express();

app.use(express.json());
app.use(cookieParser())
app.use('/auth-service', router)

//@ts-ignore
app.use(errorMiddleware)

const start = async () => {
	try {
		app.listen(port, () => {
			console.log(`Auth server is Fire at http://localhost:${port}`);
		});
	} catch (error) {
		console.error(error);
	}
};

start();
