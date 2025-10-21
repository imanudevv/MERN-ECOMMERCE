import app from './app.js';
import dotenv from 'dotenv';
import { connectMongoDataBase } from './config/db.js';

dotenv.config({ path: './config/config.env' });

// Connect to MongoDB
connectMongoDataBase();

//Handle uncaught exception error
process.on('uncaughtException', (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Server is shutting down due to uncaught exception errors`);
	process.exit(1)


})

const port = process.env.PORT || 3000;

// Start the server
const server = app.listen(port, () => {
	console.log(`Server is running on PORT ${port}`);
});



// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
	console.log(`Error: ${err.message}`);
	console.log('Server is shutting down due to unhandled promise rejection...');

	server.close(() => {
		process.exit(1);
	});
});
