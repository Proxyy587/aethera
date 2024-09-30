"use server";

import { connectToDB } from "@/lib/db";
import Subscriber from "@/lib/schema/subscriber.schema";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const addSubscriber = async (name: string, email: string, username: string) => {
  try {
    await connectToDB();

    const allUsers = await clerkClient.users.getUserList();
    const newsletterOwner = allUsers.data.find((i: any) => i.username === username);

    if (!newsletterOwner) {
      return { error: "Newsletter owner not found" };
    }

    const isExist = await Subscriber.findOne({ email, newsLetterOwnerId: username });
    if (isExist) {
      return { success: true, message: "Already subscribed" };
    }

    const subscriber = await Subscriber.create({  
      name,
      email,
      newsLetterOwnerId: username,
      source: "aethera website",
      status: "subscribed",
    });

    const plainSubscriber = JSON.parse(JSON.stringify(subscriber));

    return { success: true, message: "Subscription successful", subscriber: plainSubscriber };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while subscribing." };
  }
};
