import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import router from './router/profile-router';
import errorMiddleware from './middlewares/error-middleware';
import cors from 'cors'

const port = process.env.PORT || 3002;
const app: Application = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: [
		`${process.env.AUTH_URL}`,
		`${process.env.PROFILE_URL}`,
	],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use('/profile-service', router);

//@ts-ignore
app.use(errorMiddleware)

const start = async () => {
	try {
		app.listen(port, () => {
			console.log(`Profile server is Fire at http://localhost:${port}`);
		});
	} catch (error) {
		console.error(error);
	}
};

start();
