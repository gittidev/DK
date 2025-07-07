// components/ProjectList/ProjectTable.tsx
import styles from "./ProjectList.module.scss";
import type { Project } from "../../../types/project";

interface Props {
  projects: Project[];
  observerRef: React.RefObject<HTMLTableRowElement | null>;
  editingId: string | null;
  editProject: Partial<Project>;
  setEditProject: React.Dispatch<React.SetStateAction<Partial<Project>>>;
  setEditingId: (id: string | null) => void;
  onUpdate: () => void;
  onEdit: (project: Project) => void;
  onDelete: (approval_number: string) => void;
}

export default function ProjectTable({
  projects,
  observerRef,
  editingId,
  editProject,
  setEditProject,
  setEditingId,
  onUpdate,
  onEdit,
  onDelete,
}: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>프로젝트명</th>
          <th>승인번호</th>
          <th>발행일</th>
          <th>총액</th>
          <th>작업</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, idx) => (
          <tr
            key={project.approval_number}
            ref={idx === projects.length - 1 ? observerRef : null}
          >
            <td>
              {editingId === project.approval_number ? (
                <input
                  value={editProject.name || ""}
                  onChange={(e) =>
                    setEditProject({ ...editProject, name: e.target.value })
                  }
                />
              ) : (
                project.name
              )}
            </td>
            <td>{project.approval_number}</td>
            <td>
              {editingId === project.approval_number ? (
                <input
                  type="date"
                  value={editProject.issued_at || ""}
                  onChange={(e) =>
                    setEditProject({
                      ...editProject,
                      issued_at: e.target.value,
                    })
                  }
                />
              ) : (
                new Date(project.issued_at).toLocaleDateString("ko-KR")
              )}
            </td>
            <td>
              {editingId === project.approval_number ? (
                <input
                  type="number"
                  value={editProject.total_amount || 0}
                  onChange={(e) =>
                    setEditProject({
                      ...editProject,
                      total_amount: Number(e.target.value),
                    })
                  }
                />
              ) : (
                `₩${project.total_amount.toLocaleString()}`
              )}
            </td>
            <td>
              {editingId === project.approval_number ? (
                <>
                  <button className={styles.saveBtn} onClick={onUpdate}>
                    저장
                  </button>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setEditingId(null)}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={styles.editBtn}
                    onClick={() => onEdit(project)}
                  >
                    수정
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => onDelete(project.approval_number)}
                  >
                    삭제
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
