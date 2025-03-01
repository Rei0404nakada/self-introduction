import AuthContext from "@/components/providers/AuthProvider";
import { useGetMember } from "@/hooks/useGetMember";
import { logout } from "@/infrastructure/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import styles from "@/styles/home.module.css";
import { useAnimateButton } from "@/hooks/useAnimateButton";

export default function Login() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { data: members } = useGetMember();
  const { selectedMemberId, pending, onClick } = useAnimateButton();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);
  if (!user) return;

  console.log(members);

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerNames}>
          {members.map((member) => (
            <Link key={member.id} href={`/details/${member.id}`}>
              {member.name}
            </Link>
          ))}
        </div>
      </header>
      <main>
        <h2 className={styles.h2}>new member</h2>
        <h1 className={styles.h1}>2025卒内定者紹介</h1>
        <div className={styles.cardContainer}>
          {members.map((member) => (
            <div
              key={member.id}
              className={
                pending && selectedMemberId === member.id
                  ? `${styles.spin} ${styles.card}`
                  : styles.card
              }
            >
              <img src={member.userImageUrl} alt={member.name} />
              <p>{member.oneWordComment}</p>
              <h3 className={styles.h3}>{member.name}</h3>
              <button
                disabled={pending && selectedMemberId !== member.id}
                onClick={() => onClick(member.id)}
                className={styles.button}
              >
                READ MORE
              </button>
            </div>
          ))}
        </div>
      </main>
      <footer className={styles.footer}>
        <p>テキストテキスト</p>
        <button className={styles.logoutButton} onClick={handleLogout}>
          logout
        </button>
      </footer>
    </div>
  );
}
