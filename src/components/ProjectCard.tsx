import styles from "./ProjectCard.module.scss";
import type { ProjectWithLocation } from "../types/project";

const ProjectCard = ({ project }: { project: ProjectWithLocation }) => {
  return (
    <div className={styles.card}>
      <div>
        <h2 className={styles.title}>{project.project_name}</h2>
        <p className={styles.subtext}>
          승인번호: <span>{project.project_approval_id}</span>
        </p>
      </div>

      {project.address && (
        <div className={styles.location}>
          <span>📍</span>
          <span>{project.address}</span>
        </div>
      )}

      <hr className={styles.divider} />

      <div className={styles.dateRow}>
        <p>
          <span className={styles.label}>일자 :</span>
          {project.issued_at?.slice(0, 10) || "-"}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
