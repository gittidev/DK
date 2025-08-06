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
      <h2 className={styles.title}>우리의 강점</h2>
      <p className={styles.subtitle}>
        대광PC는 고객 만족을 최우선으로 생각하며, 최고의 기술력과 서비스로
        보답하겠습니다.
      </p>
      <div className={styles.cardContainer}>
        {siteCardInfos.map((info) => (
          <div key={info.id} className={styles.card}>
            <img src={info.icon} alt={info.title} className={styles.icon} />
            <div className={styles.cardContent}>
              <h4 className={styles.cardTitle}>{info.title}</h4>
              <p className={styles.cardDescription}>{info.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section02;
