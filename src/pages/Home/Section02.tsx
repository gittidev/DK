import styles from "./Section02.module.scss";

export const siteCardInfos = [
  {
    id: 1,
    icon: "/card/card1.webp",
    title: "믿을 수 있는 안전 시공",
    description: "모든 공정은 안전 기준을 철저히 준수합니다.",
  },
  {
    id: 2,
    icon: "/card/card2.webp",
    title: "30년 이상의 시공 경력",
    description: "노하우로 완성도 높은 결과를 만듭니다.",
  },
  {
    id: 3,
    icon: "/card/card3.webp",
    title: "수직 설치 가능",
    description: "PC BOX 수직시공 가능",
  },
  {
    id: 4,
    icon: "/card/card4.webp",
    title: "해수 소통로 설치",
    description: "바닷물 유통이 필요한 구조물 시공이 가능합니다.",
  },
];

const Section02 = () => {
  return (
    <section className={styles.container}>
      {siteCardInfos.map((info) => (
        <div key={info.id} className={styles.card}>
          <img src={info.icon} alt={info.title} className={styles.icon} />
          <h4 className={styles.title}>{info.title}</h4>
          <p className={styles.description}>{info.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Section02;
