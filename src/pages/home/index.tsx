import AuthContext from "@/components/providers/AuthProvider";
import { useGetMember } from "@/hooks/useGetMember";
import { logout } from "@/infrastructure/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "@/styles/home.module.css";
import { useAnimateButton } from "@/hooks/useAnimateButton";

interface Member {
  id: string;
  name: string;
  userImageUrl: string;
  oneWordComment: string;
}

export default function Login() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { data: members = [] } = useGetMember();
  const { selectedMemberId, pending, onClick } = useAnimateButton();
  const [tilt, setTilt] = useState<{
    [key: string]: {
      rotateX: number;
      rotateY: number;
      shadowX: number;
      shadowY: number;
      lightX: number;
      lightY: number;
      lightOpacity: number;
    };
  }>({});

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

  if (!user) return null;

  console.log(members);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    memberId: string
  ) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -y / 15; // 縦の傾き（少し控えめ）
    const rotateY = x / 5; // 横の傾きを強調

    const shadowX = -rotateY * 3;
    const shadowY = rotateX * 2;

    const lightX = rotateY * 5; // 傾きに応じて光の位置を変化
    const lightY = -rotateX * 5;

    // 光の強度を、傾きに応じて変更
    const lightOpacity = Math.min(Math.abs(lightX) + Math.abs(lightY), 1);

    setTilt((prev) => ({
      ...prev,
      [memberId]: {
        rotateX,
        rotateY,
        shadowX,
        shadowY,
        lightX,
        lightY,
        lightOpacity,
      },
    }));
  };

  const resetTilt = (memberId: string) => {
    setTilt((prev) => ({
      ...prev,
      [memberId]: {
        rotateX: 0,
        rotateY: 0,
        shadowX: 0,
        shadowY: 0,
        lightX: 0,
        lightY: 0,
        lightOpacity: 0,
      },
    }));
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerNames}>
          {members.map((member: Member) => (
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
          {members.map((member: Member) => (
            <div
              key={member.id}
              className={`${styles.card} ${
                pending && selectedMemberId === member.id ? styles.spin : ""
              }`}
              onMouseMove={(e) => handleMouseMove(e, member.id)}
              onMouseLeave={() => resetTilt(member.id)}
              style={{
                transform: `rotateX(${
                  tilt[member.id]?.rotateX || 0
                }deg) rotateY(${tilt[member.id]?.rotateY || 0}deg) scale(1.05)`,
                boxShadow: `${tilt[member.id]?.shadowX || 0}px ${
                  tilt[member.id]?.shadowY || 0
                }px 20px rgba(0, 0, 0, 0.3)`,
                border: "1px solid black",
              }}
            >
              <div
                className={styles.cardOverlay}
                style={{
                  opacity: tilt[member.id]?.lightOpacity || 0.2, // 光の強度を調整
                  transform: `translate(${tilt[member.id]?.lightX || 0}px, ${
                    tilt[member.id]?.lightY || 0
                  }px)`, // 光の位置を動かす
                }}
              ></div>
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
