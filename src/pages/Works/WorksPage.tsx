import styles from "./WorksPage.module.scss"; // 스타일 모듈 import
import ProjectCard from "../../components/ProjectCard"; // 프로젝트 카드 컴포넌트
import { supabase } from "../../utils/supabaseClient"; // Supabase 클라이언트
import { useEffect, useState } from "react"; // React hook
import type { ProjectWithLocation } from "../../types/project"; // 타입 정의
import Button from "../../components/Button"; // 커스텀 버튼 컴포넌트

const PAGE_SIZE = 10; // 페이지당 항목 수

export default function WorksPage() {
  // 상태 정의
  const [projects, setProjects] = useState<ProjectWithLocation[]>([]); // 프로젝트 목록
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalCount, setTotalCount] = useState(0); // 전체 프로젝트 수

  // 페이지 변경될 때마다 데이터 요청
  useEffect(() => {
    const fetchProjects = async () => {
      const from = (page - 1) * PAGE_SIZE; // 시작 인덱스
      const to = from + PAGE_SIZE - 1; // 끝 인덱스

      const { data, error, count } = await supabase
        .from("project_with_location_view") // Supabase View에서 가져옴
        .select("*", { count: "exact" }) // 전체 개수 포함
        .order("issued_at", { ascending: false }) // 최근 발행일 순 정렬
        .range(from, to); // 페이지 범위 지정

      if (error) {
        console.error("Error fetching projects:", error);
        return;
      }

      setProjects(data || []); // 데이터 설정

      if (count !== null) setTotalCount(count); // 총 개수 설정
    };

    fetchProjects();
  }, [page]); // page가 변경될 때마다 실행

  return (
    <div className={styles.container}>
      {/* 프로젝트 카드 목록 */}
      <div className={styles.cardList}>
        {projects.map((project) => (
          <ProjectCard key={project.project_approval_id} project={project} />
        ))}
      </div>

      {/* 페이지네이션 영역 */}
      <div className={styles.pagination}>
        <Button
          direction="left"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          &lt;
        </Button>

        <div className={styles.pageInfo}>
          {page} / {Math.ceil(totalCount / PAGE_SIZE)}
        </div>

        <Button
          direction="right"
          onClick={() => {
            setPage((prev) =>
              prev * PAGE_SIZE < totalCount ? prev + 1 : prev
            );
          }}
          disabled={page * PAGE_SIZE >= totalCount}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
}
