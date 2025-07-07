import styles from "./Section03.module.scss";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function Box() {
  const { scene } = useGLTF("/models/precast_concrete_box.glb");
  return <primitive object={scene} />;
}

const Section03 = () => {
  const navigate = useNavigate();
  const goWorks = () => {
    navigate("/works");
  };
  return (
    <section className={styles.wrapper}>
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [1.5, 1.5, 1.5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.3}
            enableDamping
            dampingFactor={0.05}
            minDistance={1.5}
            maxDistance={5}
          />
          <Box />
        </Canvas>
      </div>

      <div className={styles.description}>
        <h2>PC 박스란?</h2>
        <p>
          PC 박스는 프리캐스트 콘크리트 구조물로, 하천이나 도로 하부에 설치되어{" "}
          <strong>배수 및 통로 기능</strong>을 수행합니다. 현장에서 조립만으로
          시공이 가능하여 <strong>공사 기간을 단축</strong>하고,{" "}
          <strong>내구성 또한 우수</strong>합니다.
        </p>
        <p>
          대광PC는 다양한 환경에 맞춰 <strong>수직 설치</strong> 및{" "}
          <strong>해수 유통로</strong> 적용도 가능하여 폭넓은 시공 옵션을
          제공합니다.
        </p>
        <p>
          <Button onClick={goWorks} variant="default-white" size="large">
            시공 현장 확인하기
          </Button>
        </p>
      </div>
    </section>
  );
};

export default Section03;
