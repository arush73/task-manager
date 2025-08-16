import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/index.js"
dotenv.config({
	path:"./.env"
})

const port = process.env.PORT || 8080

connectDB()
	.then(()=>{
		app.listen(port, ()=>{
			console.log("Server is running on the port: " + port)
		})
	})
	.catch((error) => {
		console.error("MongoDB connection error: " + error.message)
		process.exit(1)
	})

