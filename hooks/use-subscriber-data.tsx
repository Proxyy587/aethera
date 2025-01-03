"use client";

import { getSubscriber } from "@/actions/get.subscriber";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const useSubscribersData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useClerk();

  useEffect(() => {
    GetSubscribers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const GetSubscribers = async () => {
    console.log(user?.username)
    await getSubscriber({ newsLetterOwnerId: user?.username! })
      .then((res: any) => {
        setData(res);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return { data, loading };
};

export default useSubscribersData;
