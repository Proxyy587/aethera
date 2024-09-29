import mongoose from "mongoose";

if (!process.env.DATABASE_URL) {
	throw new Error('Invalid/Missing env: "DATABASE_URL"');
}

const uri = process.env.DATABASE_URL;
const options = {
	// ssl: true,
	// tlsAllowInvalidCertificates: true,
};

export const connectToDB = async () => {
	try {
		await mongoose.connect(uri, options);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error);
	}
};
