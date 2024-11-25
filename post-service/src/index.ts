import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import router from './router/posts-router';
import errorMiddleware from './middleware/error-middleware';

const app = express()
const port = process.env.PORT || 3003;

app.use(express.json());

app.use('/posts-service', router)

//@ts-ignore
app.use(errorMiddleware)
const start = async () => {
	try {
		app.listen(port, () => {
			console.log(`Posts server is Fire at http://localhost:${port}`);
		});
	} catch (error) {
		console.error(error);
	}
};

start();

