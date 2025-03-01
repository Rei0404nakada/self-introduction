import { Member } from "./useGetMember";

export const useGetSelectedMember = (
  members: Member[],
  selectedMemberID: string
) => {
  const selectedMember = members.find(
    (member) => member.id === selectedMemberID
  );
  const notSelectedMembers = members.filter(
    (member) => member.id !== selectedMemberID
  );

  return {
    selectedMember,
    notSelectedMembers,
  };
};
