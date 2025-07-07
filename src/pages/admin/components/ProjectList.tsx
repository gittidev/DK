import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import styles from "./ProjectList.module.scss";
import type { Project } from "./../../../types/project";
import ProjectForm from "./ProjectForm";
import ProjectTable from "./ProjectTable";

const PAGE_SIZE = 10;

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
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

  const handleAdd = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
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

  const handleDelete = async (approval_number: string) => {
    await supabase
      .from("projects")
      .delete()
      .eq("approval_number", approval_number);
    setProjects((prev) =>
      prev.filter((p) => p.approval_number !== approval_number)
    );
  };

  return (
    <div className={styles.tableWrapper}>
      <ProjectForm onAdd={handleAdd} />
      <ProjectTable
        projects={projects}
        observerRef={observerRef}
        editingId={editingId}
        editProject={editProject}
        setEditProject={setEditProject}
        setEditingId={setEditingId}
        onEdit={handleEdit}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      {!hasMore && (
        <p className={styles.endMessage}>모든 프로젝트를 불러왔습니다.</p>
      )}
    </div>
  );
}
