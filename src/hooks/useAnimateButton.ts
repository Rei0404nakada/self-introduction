import { useRouter } from "next/router";
import { useState } from "react";

export const useAnimateButton = () => {
  const router = useRouter();
  const [selectedMemberId, setSelectedMemberId] = useState<string>();
  const [pending, setPending] = useState<boolean>(false);

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const onClick = async (id: string) => {
    if (pending) return;
    setSelectedMemberId(id);
    setPending(true);
    await sleep(1000);

    router.push(`/details/${id}`);
  };

  return {
    selectedMemberId,
    pending,
    onClick,
  };
};
