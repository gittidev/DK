// components/ProjectList.tsx
import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "../../../utils/supabaseClient";
import styles from "./ProjectList.module.scss";

interface Project {
  approval_number: string;
  name: string;
  issued_at: string;
  total_amount: number;
}

const PAGE_SIZE = 10;

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({});
  const [editProject, setEditProject] = useState<Partial<Project>>({});
  const observerRef = useRef<HTMLTableRowElement | null>(null);

  const fetchProjects = useCallback(async () => {
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("projects")
      .select("approval_number, name, issued_at, total_amount")
      .order("issued_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("프로젝트 불러오기 오류:", error.message);
      return;
    }

    if (data && data.length > 0) {
      setProjects((prev) => [...prev, ...data]);
      if (data.length < PAGE_SIZE) setHasMore(false);
    } else {
      setHasMore(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [projects, hasMore]);

  const handleDelete = async (approval_number: string) => {
    await supabase
      .from("projects")
      .delete()
      .eq("approval_number", approval_number);
    setProjects((prev) =>
      prev.filter((p) => p.approval_number !== approval_number)
    );
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.approval_number);
    setEditProject(project);
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    await supabase
      .from("projects")
      .update(editProject)
      .eq("approval_number", editingId);
    setProjects((prev) =>
      prev.map((p) =>
        p.approval_number === editingId ? { ...p, ...editProject } : p
      )
    );
    setEditingId(null);
  };

  const handleAdd = async () => {
    if (!newProject.name || !newProject.issued_at || !newProject.total_amount)
      return;
    const approval_number = Date.now().toString();
    const fullProject = { ...newProject, approval_number } as Project;
    await supabase.from("projects").insert([fullProject]);
    setProjects((prev) => [fullProject, ...prev]);
    setNewProject({});
  };

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.addForm}>
        <input
          placeholder="프로젝트명"
          value={newProject.name || ""}
          onChange={(e) =>
            setNewProject({ ...newProject, name: e.target.value })
          }
        />
        <input
          type="date"
          value={newProject.issued_at || ""}
          onChange={(e) =>
            setNewProject({ ...newProject, issued_at: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="총액"
          value={newProject.total_amount || ""}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              total_amount: Number(e.target.value),
            })
          }
        />
        <button className={styles.addBtn} onClick={handleAdd}>
          추가
        </button>
      </div>

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
                    <button className={styles.saveBtn} onClick={handleUpdate}>
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
                      onClick={() => handleEdit(project)}
                    >
                      수정
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(project.approval_number)}
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
      {!hasMore && (
        <p className={styles.endMessage}>모든 프로젝트를 불러왔습니다.</p>
      )}
    </div>
  );
}
