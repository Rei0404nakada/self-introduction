import { db } from "@/infrastructure/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export type Member = {
  id: string;
  headerImage: string;
  name: string;
  oneWordComment: string;
  school: string;
  userImageUrl: string;
  firstSubtitleText: string;
  secondSubtitleText: string;
  thirdSubtitleText: string;
  firstImageText: string;
  secondImageText: string;
  thirdImageText: string;
  fourthImageText: string;
  fifthImageText: string;
  sixthImageText: string;
  firstImage: string;
  secondImage: string;
  thirdImage: string;
  fourthImage: string;
  fifthImage: string;
  sixthImage: string;
};

export const useGetMember = () => {
  const [member, setMember] = useState<Member[]>([]);

  const getData = async () => {
    const result = await getDocs(collection(db, "content"));
    const formattedData = result.docs.map((item) => {
      const data = item.data() as Omit<Member, "id">;
      return {
        id: item.id,
        ...data,
      };
    });

    setMember(formattedData);
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data: member,
  };
};
