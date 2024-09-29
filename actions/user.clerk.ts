"use server";


import { clerkClient } from '@clerk/clerk-sdk-node'


export async function getUserByEmail(username: string) {
    const userList = await clerkClient.users.getUserList()

    const newsletterOwner = userList.data.find((i: any) => i.username === username);
    return newsletterOwner;
}
