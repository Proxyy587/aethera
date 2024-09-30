// import mongoose, { Schema, Document } from "mongoose";

// // Define the User interface
// export interface IUser extends Document {
// 	fullname: string;
// 	clerkId: string;
// 	type: string;
// 	createdAt: Date;
// 	updatedAt: Date;
// 	stripeId?: string;
// }

// // Define the Domain interface
// export interface IDomain extends Document {
// 	name: string;
// 	icon: string;
// 	userId?: mongoose.Types.ObjectId;
// 	campaignId?: mongoose.Types.ObjectId;
// }

// // Define the ChatBot interface
// export interface IChatBot extends Document {
// 	welcomeMessage?: string;
// 	icon?: string;
// 	background?: string;
// 	textColor?: string;
// 	helpdesk: boolean;
// 	domainId?: mongoose.Types.ObjectId;
// }

// // Define the Billings interface
// export interface IBillings extends Document {
// 	plan: string; // Could use an enum here if needed
// 	credits: number;
// 	userId?: mongoose.Types.ObjectId;
// }

// // Define the HelpDesk interface
// export interface IHelpDesk extends Document {
// 	question: string;
// 	answer: string;
// 	domainId?: mongoose.Types.ObjectId;
// }

// // Define the FilterQuestions interface
// export interface IFilterQuestions extends Document {
// 	question: string;
// 	answered?: string;
// 	domainId?: mongoose.Types.ObjectId;
// }

// // Define the Customer interface
// export interface ICustomer extends Document {
// 	email?: string;
// 	domainId?: mongoose.Types.ObjectId;
// }

// // Define the ChatRoom interface
// export interface IChatRoom extends Document {
// 	live: boolean;
// 	mailed: boolean;
// 	customerId?: mongoose.Types.ObjectId;
// }

// // Define the ChatMessage interface
// export interface IChatMessage extends Document {
// 	message: string;
// 	role?: string; // Could use an enum here if needed
// 	chatRoomId?: mongoose.Types.ObjectId;
// 	seen: boolean;
// }

// // Define the Booking interface
// export interface IBooking extends Document {
// 	date: Date;
// 	slot: string;
// 	email: string;
// 	customerId?: mongoose.Types.ObjectId;
// }

// // Define the Campaign interface
// export interface ICampaign extends Document {
// 	name: string;
// 	customers: string[]; // Assuming it's an array of customer IDs
// 	userId?: mongoose.Types.ObjectId;
// }

// // Define the Product interface
// export interface IProduct extends Document {
// 	name: string;
// 	price: number;
// 	image: string;
// 	domainId?: mongoose.Types.ObjectId;
// }

// // User Schema
// const userSchema = new Schema<IUser>({
// 	fullname: { type: String, required: true },
// 	clerkId: { type: String, required: true, unique: true },
// 	type: { type: String, required: true },
// 	createdAt: { type: Date, default: Date.now },
// 	updatedAt: { type: Date, default: Date.now },
// 	stripeId: { type: String },
// });

// // Domain Schema
// const domainSchema = new Schema<IDomain>({
// 	name: { type: String, required: true },
// 	icon: { type: String, required: true },
// 	userId: { type: Schema.Types.ObjectId, ref: "User" },
// 	campaignId: { type: Schema.Types.ObjectId, ref: "Campaign" },
// });

// // ChatBot Schema
// const chatBotSchema = new Schema<IChatBot>({
// 	welcomeMessage: { type: String },
// 	icon: { type: String },
// 	background: { type: String },
// 	textColor: { type: String },
// 	helpdesk: { type: Boolean, default: false },
// 	domainId: { type: Schema.Types.ObjectId, ref: "Domain", unique: true },
// });

// // Billings Schema
// const billingsSchema = new Schema<IBillings>({
// 	plan: {
// 		type: String,
// 		enum: ["STANDARD", "PRO", "ULTIMATE"],
// 		default: "STANDARD",
// 	},
// 	credits: { type: Number, default: 10 },
// 	userId: { type: Schema.Types.ObjectId, ref: "User", unique: true },
// });

// // HelpDesk Schema
// const helpDeskSchema = new Schema<IHelpDesk>({
// 	question: { type: String, required: true },
// 	answer: { type: String, required: true },
// 	domainId: { type: Schema.Types.ObjectId, ref: "Domain" },
// });

// // FilterQuestions Schema
// const filterQuestionsSchema = new Schema<IFilterQuestions>({
// 	question: { type: String, required: true },
// 	answered: { type: String },
// 	domainId: { type: Schema.Types.ObjectId, ref: "Domain" },
// });

// // Customer Schema
// const customerSchema = new Schema<ICustomer>({
// 	email: { type: String },
// 	domainId: { type: Schema.Types.ObjectId, ref: "Domain" },
// });

// // ChatRoom Schema
// const chatRoomSchema = new Schema<IChatRoom>({
// 	live: { type: Boolean, default: false },
// 	mailed: { type: Boolean, default: false },
// 	customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
// });

// // ChatMessage Schema
// const chatMessageSchema = new Schema<IChatMessage>({
// 	message: { type: String, required: true },
// 	role: { type: String }, // You could use enum if needed
// 	chatRoomId: { type: Schema.Types.ObjectId, ref: "ChatRoom" },
// 	seen: { type: Boolean, default: false },
// });

// // Booking Schema
// const bookingSchema = new Schema<IBooking>({
// 	date: { type: Date, required: true },
// 	slot: { type: String, required: true },
// 	email: { type: String, required: true },
// 	customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
// });

// // Campaign Schema
// const campaignSchema = new Schema<ICampaign>({
// 	name: { type: String, required: true },
// 	customers: { type: [String], default: [] },
// 	userId: { type: Schema.Types.ObjectId, ref: "User" },
// });

// // Product Schema
// const productSchema = new Schema<IProduct>({
// 	name: { type: String, required: true },
// 	price: { type: Number, required: true },
// 	image: { type: String, required: true },
// 	domainId: { type: Schema.Types.ObjectId, ref: "Domain" },
// });

// // Export models
// const User = mongoose.model<IUser>("User", userSchema);
// const Domain = mongoose.model<IDomain>("Domain", domainSchema);
// const ChatBot = mongoose.model<IChatBot>("ChatBot", chatBotSchema);
// const Billings = mongoose.model<IBillings>("Billings", billingsSchema);
// const HelpDesk = mongoose.model<IHelpDesk>("HelpDesk", helpDeskSchema);
// const FilterQuestions = mongoose.model<IFilterQuestions>(
// 	"FilterQuestions",
// 	filterQuestionsSchema
// );
// const Customer = mongoose.model<ICustomer>("Customer", customerSchema);
// const ChatRoom = mongoose.model<IChatRoom>("ChatRoom", chatRoomSchema);
// const ChatMessage = mongoose.model<IChatMessage>(
// 	"ChatMessage",
// 	chatMessageSchema
// );
// const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
// const Campaign = mongoose.model<ICampaign>("Campaign", campaignSchema);
// const Product = mongoose.model<IProduct>("Product", productSchema);

// export {
// 	User,
// 	Domain,
// 	ChatBot,
// 	Billings,
// 	HelpDesk,
// 	FilterQuestions,
// 	Customer,
// 	ChatRoom,
// 	ChatMessage,
// 	Booking,
// 	Campaign,
// 	Product,
// };
