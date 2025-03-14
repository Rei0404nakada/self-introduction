/* eslint-disable @next/next/no-img-element */
import AuthContext from "@/components/providers/AuthProvider";
import { useGetMember } from "@/hooks/useGetMember";
import { logout } from "@/infrastructure/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "@/styles/details.module.css";
import { useGetSelectedMember } from "@/hooks/useGetSelectedMember";
import Image from "next/image";

export default function Detail() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const selectedMemberID = router.query.id as string;
  const { data: members } = useGetMember();
  const { selectedMember, notSelectedMembers } = useGetSelectedMember(
    members,
    selectedMemberID
  );
  const [open, setOpen] = useState(false);

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
  if (!selectedMember) return;

  console.log(members);
  return (
    <>
      <header className={styles.header}>
        <input
          type="checkbox"
          onClick={() => setOpen((prev) => !prev)}
          id="menuToggle"
          className={styles.menuToggle}
        />
        <label htmlFor="menuToggle" className={styles.menuBtn}>
          <span
            style={{
              transform: open
                ? `translateY(11px) rotate(-315deg)`
                : `translateY(0px)`,
              backgroundColor: open ? `red` : `#333`,
            }}
          ></span>
          <span style={{ opacity: open ? 0 : 100 }}></span>
          <span
            style={{
              transform: open
                ? `translateY(-10px) rotate(315deg)`
                : `translateY(0px)`,
              backgroundColor: open ? `red` : `#333`,
            }}
          ></span>
        </label>
        <nav
          className={styles.menu}
          style={{
            display: open ? "block" : "none",
          }}
        >
          <Link href={"/home"}>HOME</Link>
          {members.map((member) => (
            <Link key={member.id} href={`/details/${member.id}`}>
              {member.name}
            </Link>
          ))}
        </nav>
        <div className={styles.headerNames}>
          <Link href={"/home"}>HOME</Link>
          {members.map((member) => (
            <Link key={member.id} href={`/details/${member.id}`}>
              {member.name}
            </Link>
          ))}
        </div>
      </header>
      <main>
        <div className={styles.headerImage}>
          <img src={selectedMember.headerImage} alt="Header Image" />
        </div>
        <section>
          <div className={styles.profile}>
            <img src={selectedMember.userImageUrl} alt={selectedMember.name} />
            <div className={styles.profileDetails}>
              <p>{selectedMember.oneWordComment}</p>
              <h3 className={styles.h3}>{selectedMember.name}</h3>
              <p className={styles.school}>{selectedMember.school}</p>
            </div>
          </div>
          <hr className={styles.customLine} />
          <h2 className={styles.subtitleBelowLine}>Profile</h2>
          <div className={styles.bottomElements}>
            <div className={styles.element}>
              <h3 className={styles.h3}>好きなこと</h3>
              <p className={styles.subtitleAlphabet}>HOBBY</p>
              <Image
                src="/icon1.png"
                alt={""}
                className={styles.elementImage}
                width={100}
                height={100}
              />
              <p className={styles.elementText}>
                {selectedMember.firstSubtitleText}
              </p>
            </div>
            <div className={styles.element}>
              <h3 className={styles.h3}>やりたいこと</h3>
              <p className={styles.subtitleAlphabet}>TARGET</p>
              <Image
                src="/icon2.png"
                alt={""}
                className={styles.elementImage}
                width={100}
                height={100}
              />
              <p className={styles.elementText}>
                {selectedMember.secondSubtitleText}
              </p>
            </div>
            <div className={styles.element}>
              <h3 className={styles.h3}>学んだこと</h3>
              <p className={styles.subtitleAlphabet}>EXPERIENCE</p>
              <Image
                src="/icon3.png"
                alt={""}
                className={styles.elementImage}
                width={100}
                height={100}
              />
              <p className={styles.elementText}>
                {selectedMember.thirdSubtitleText}
              </p>
            </div>
          </div>
          <h2 className={styles.subtitleBelowLine}>Memory</h2>
          <div className={styles.bottomElements}>
            <div className={styles.element}>
              <img
                className={styles.myImage}
                src={selectedMember.firstImage}
                alt="Image 1"
              />
              <p className={styles.elementText}>
                {selectedMember.firstImageText}
              </p>
            </div>
            <div className={styles.element}>
              <img
                className={styles.myImage}
                src={selectedMember.secondImage}
                alt="Image 2"
              />
              <p className={styles.elementText}>
                {selectedMember.secondImageText}
              </p>
            </div>
            <div className={styles.element}>
              <img
                className={styles.myImage}
                src={selectedMember.thirdImage}
                alt="Image 3"
              />
              <p className={styles.elementText}>
                {selectedMember.thirdImageText}
              </p>
            </div>
          </div>
          <div className={styles.bottomElements}>
            <div className={styles.element}>
              <img
                className={styles.myImage}
                src={selectedMember.fourthImage}
                alt="Image 4"
              />
              <p className={styles.elementText}>
                {selectedMember.fourthImageText}
              </p>
            </div>
            <div className={styles.element}>
              <img
                className={styles.myImage}
                src={selectedMember.fifthImage}
                alt="Image 5"
              />
              <p className={styles.elementText}>
                {selectedMember.fifthImageText}
              </p>
            </div>
            <div className={styles.element}>
              <img
                className={styles.myImage}
                src={selectedMember.sixthImage}
                alt="Image 6"
              />
              <p className={styles.elementText}>
                {selectedMember.sixthImageText}
              </p>
            </div>
          </div>

          <h2 className={styles.h2}>Other offers</h2>
          <h1 className={styles.h1}>他の内定者を見る</h1>
          <div className={styles.cardContainer}>
            {notSelectedMembers.map((member) => (
              <div key={member.id} className={styles.card}>
                <img src={member.userImageUrl} alt={member.name} />
                <p className={styles.comment}>{member.oneWordComment}</p>
                <h3>{member.name}</h3>
                <Link href={`/details/${member.id}`}>READ MORE</Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>Copyright © 2025 nakada. All Rights Reserved.</p>
        <button className={styles.logoutButton} onClick={handleLogout}>
          logout
        </button>
      </footer>
    </>
  );
}
