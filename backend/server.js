import app from './app.js'
import dotenv from 'dotenv'
import { connectMongoDataBase } from './config/db.js';
dotenv.config({ path: './config/config.env' })
connectMongoDataBase();
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`server is running on PORT ${port}`);
})
