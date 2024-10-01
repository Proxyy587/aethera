"use server";

import { connectToDB } from "@/lib/db";
import Subscriber from "@/lib/schema/subscriber.schema";

export const getSubscriber = async ({
  newsLetterOwnerId,
  period = "7",
}: {
  newsLetterOwnerId: string;
  period?: "7" | "30" | "90";
}) => {
  try {
    await connectToDB();

    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - parseInt(period) + 1); 

    const subscribers = await Subscriber.find({
      newsLetterOwnerId,
      createdAt: { $gte: startDate, $lte: endDate },
    }).sort({ createdAt: 1 });

    const groupedSubscribers: Record<string, number> = {};

    for (let i = 0; i < parseInt(period); i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dateString = currentDate.toISOString().split('T')[0];
      groupedSubscribers[dateString] = 0;
    }

    subscribers.forEach((subscriber) => {
      const dateString = new Date(subscriber.createdAt).toISOString().split('T')[0];
      if (groupedSubscribers[dateString] !== undefined) {
        groupedSubscribers[dateString]++;
      }
    });

    return groupedSubscribers;
  } catch (error) {
    console.error(error);
    return {};
  }
};