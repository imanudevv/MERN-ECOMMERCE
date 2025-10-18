import app from './app.js'
import dotenv from 'dotenv'
dotenv.config({ path: './config/config.env' })
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`server is running on PORT ${port}`);
})
