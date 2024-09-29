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
      return isExist;
    }

    const subscriber = await Subscriber.create({  
      name,
      email,
      newsLetterOwnerId: newsletterOwner?.id,
      source: "aethera website",
      status: "subscribed",
    });

    return subscriber;
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while subscribing." };
  }
};
