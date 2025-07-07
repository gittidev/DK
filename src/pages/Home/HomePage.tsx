import styles from "./HomePage.module.scss";
import Section01 from "./Section01";
import Section02 from "./Section02";
import Section03 from "./Section03";
import Section04 from "./Section04";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <title>대광PC - 프리캐스트 콘크리트 시공 전문 기업</title>
      <meta
        name="description"
        content="PC 박스 설치 전문 기업 대광PC. 광주 & 전남권역 어디든 정확하고 빠른 시공 제공!"
      />
      <meta name="author" content="대광PC" />
      <meta property="og:title" content="대광PC - 콘크리트 박스 전문 시공" />
      <meta
        property="og:description"
        content="PC 박스 설치는 믿고 맡기는 대광PC!"
      />
      <meta
        property="og:image"
        content={`${import.meta.env.VITE_SITE_URL}/og_logo.svg`}
      />

      <meta name="robots" content="index, follow" />
      <section>
        <Section01 />
      </section>
      <section>
        <Section02 />
      </section>
      <section>
        <Section03 />
      </section>
      <section>
        <Section04 />
      </section>
    </main>
  );
}
