// components/ProjectList/ProjectForm.tsx
import { useForm } from "react-hook-form";
import { supabase } from "../../../utils/supabaseClient";
import styles from "./ProjectForm.module.scss";
import type { Project } from "../../../types/project";

interface Props {
  onAdd: (project: Project) => void;
}

export default function ProjectForm({ onAdd }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Project>();

  const validateApprovalNumber = async (value: string) => {
    const { data } = await supabase
      .from("projects")
      .select("approval_number")
      .eq("approval_number", value)
      .maybeSingle();
    return data ? "이미 사용 중인 승인번호입니다." : true;
  };

  const onSubmit = async (data: Project) => {
    const { error } = await supabase.from("projects").insert([data]);
    if (error) {
      alert("추가 중 오류 발생");
      return;
    }
    onAdd(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addForm}>
      <div className={styles.formGroup}>
        <input
          placeholder="프로젝트명"
          {...register("name", { required: "프로젝트명을 입력해주세요" })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <input
          placeholder="승인번호"
          {...register("approval_number", {
            required: "승인번호를 입력해주세요",
            validate: validateApprovalNumber,
          })}
        />
        {errors.approval_number && <p>{errors.approval_number.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <input
          type="date"
          {...register("issued_at", { required: "발행일을 입력해주세요" })}
        />
        {errors.issued_at && <p>{errors.issued_at.message}</p>}
      </div>

      <div className={styles.formGroup}>
        <input
          type="number"
          placeholder="총액"
          {...register("total_amount", {
            required: "총액을 입력해주세요",
            valueAsNumber: true,
          })}
        />
        {errors.total_amount && <p>{errors.total_amount.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        +
      </button>
    </form>
  );
}
