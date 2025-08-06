import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./Section01.module.scss";
import Button from "../../components/Button";

const images = [
  "/images/main1.webp",
  "/images/main2.webp",
  "/images/main3.webp",
  "/images/main4.webp",
  "/images/main5.webp",
  "/images/main6.webp",
];

export default function Section01() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIndex((prevIndex) => (prevIndex + 1) % images.length);
          return 0;
        }
        return prev + 1;
      });
    }, 50);
  }, []);

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetInterval]);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setProgress(0);
    resetInterval();
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
    setProgress(0);
    resetInterval();
  };

  return (
    <div className={styles.background}>
      {images.map((img, i) => (
        <div
          key={i}
          className={`${styles.backgroundImage} ${
            i === index ? styles.active : ""
          }`}
          style={{
            backgroundImage: `url(${img})`,
          }}
        ></div>
      ))}
      <div className={styles.overlayContent}>
        <h1>대광 PC</h1>
        <p>
          최고의 기술력과 노하우를 바탕으로 프리캐스트 콘크리트 산업을
          선도합니다.
        </p>
        <div className={styles.control}>
          <Button direction="left" onClick={handlePrev}>
            &lt;
          </Button>
          <div className={styles.progressbar}>
            <div
              className={styles.progress}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <Button direction="right" onClick={handleNext}>
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}
