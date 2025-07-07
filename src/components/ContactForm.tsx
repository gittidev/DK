import { useForm, useFieldArray } from "react-hook-form";
import styles from "./ContactForm.module.scss";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface PCSpec {
  spec: string;
  length: string;
}

interface ContactFormValues {
  location: string;
  timeline: string;
  contact: string;
  estimatedCost: string;
  equipment: string;
  otherRequests: string;
  pcBoxSpecs: PCSpec[];
}

export default function ContactForm() {
  const { register, handleSubmit, control } = useForm<ContactFormValues>({
    defaultValues: {
      location: "",
      timeline: "",
      contact: "",
      estimatedCost: "",
      equipment: "",
      otherRequests: "",
      pcBoxSpecs: [{ spec: "", length: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pcBoxSpecs",
  });

  const onSubmit = async (data: ContactFormValues) => {
    await createAndDownloadExcel(data);
    openEmailClient(data);
  };

  const createAndDownloadExcel = async (data: ContactFormValues) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("견적서");

    const titleStyle = {
      font: { bold: true, size: 14, color: { argb: "FFFFFF" } },
      alignment: { vertical: "middle", horizontal: "center" },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "3182CE" } },
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
    } as const;

    const headerStyle = {
      font: { bold: true, size: 12, color: { argb: "FFFFFF" } },
      alignment: { vertical: "middle", horizontal: "center" },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "4A5568" } },
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
    } as const;

    const cellStyle = {
      font: { size: 10 },
      alignment: { vertical: "middle", horizontal: "center" },
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
    } as const;

    worksheet.columns = [
      { key: "A", width: 20 },
      { key: "B", width: 30 },
    ];

    worksheet.mergeCells("A1:B1");
    worksheet.getCell("A1").value = `${data.location} 견적서`;
    worksheet.getCell("A1").style = titleStyle;

    worksheet
      .addRow(["연락처", data.contact])
      .eachCell((c) => (c.style = cellStyle));
    worksheet
      .addRow(["시공 시기", data.timeline])
      .eachCell((c) => (c.style = cellStyle));
    worksheet
      .addRow(["시공 장소", data.location])
      .eachCell((c) => (c.style = cellStyle));
    worksheet
      .addRow(["예상 시공 견적비용", data.estimatedCost])
      .eachCell((c) => (c.style = cellStyle));
    worksheet.addRow([]);

    worksheet
      .addRow(["PC 예상 시공 내역", ""])
      .eachCell((cell) => (cell.style = headerStyle));
    worksheet.mergeCells(`A6:B6`);

    worksheet
      .addRow(["PC 박스 규격", "길이(M)"])
      .eachCell((cell) => (cell.style = headerStyle));
    data.pcBoxSpecs.forEach((item) => {
      worksheet
        .addRow([item.spec, item.length])
        .eachCell((c) => (c.style = cellStyle));
    });

    worksheet.addRow([]);
    worksheet
      .addRow(["장비 지원 여부", data.equipment])
      .eachCell((c) => (c.style = cellStyle));
    worksheet
      .addRow(["기타 요청 사항", data.otherRequests])
      .eachCell((c) => (c.style = cellStyle));

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${data.location}_견적서.xlsx`);
  };

  const openEmailClient = (data: ContactFormValues) => {
    const emailAddress = "pyw4733@hanmail.net";
    const subject = `${data.location} 견적 요청드립니다`;
    let mailBody = `다음 세부사항이 포함된 견적을 제공해 주세요:\n`;
    mailBody += `- 시공 장소: ${data.location}\n`;
    mailBody += `- 시공 시기: ${data.timeline}\n`;
    mailBody += `- 연락처: ${data.contact}\n`;
    mailBody += `- 장비 지원 여부: ${data.equipment}\n`;
    mailBody += `- 기타 요청: ${data.otherRequests}\n`;

    data.pcBoxSpecs.forEach((item, idx) => {
      mailBody += `- PC 박스 ${idx + 1}: 규격 ${item.spec}, 길이 ${
        item.length
      }\n`;
    });

    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(mailBody)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.heading}>견적 요청</h2>
        <p className={styles.description}>아래 정보를 입력해 주세요.</p>

        <div className={styles.formGroup}>
          <label>시공 장소</label>
          <input {...register("location", { required: true })} />
        </div>

        <div className={styles.formGroup}>
          <label>시공 시기</label>
          <input {...register("timeline", { required: true })} />
        </div>

        <div className={styles.formGroup}>
          <label>연락처</label>
          <input {...register("contact", { required: true })} />
        </div>

        <div className={styles.formGroup}>
          <label>예상 시공 견적비용</label>
          <input {...register("estimatedCost")} />
        </div>

        <div className={styles.formGroup}>
          <label>PC 박스 규격 및 설치 길이</label>
          {fields.map((field, index) => (
            <div key={field.id} className={styles.pcBoxEntry}>
              <select
                {...register(`pcBoxSpecs.${index}.spec` as const)}
                defaultValue=""
                className={styles.specSelect}
              >
                <option value="">규격 선택</option>
                <option value="4.0x7.0">4.0x7.0</option>
                <option value="3.0x2.0">3.0x2.0</option>
                <option value="2.5x2.5">2.5x2.5</option>
                <option value="2.5x1.5">2.5x1.5</option>
                <option value="2.0x1.5">2.0x1.5</option>
                <option value="1.0x1.0">1.0x1.0</option>
                <option value="기타">기타</option>
              </select>

              <input
                placeholder="50m"
                {...register(`pcBoxSpecs.${index}.length` as const)}
              />
              <button type="button" onClick={() => remove(index)}>
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ spec: "", length: "" })}
            className={styles.addBtn}
          >
            + 항목 추가
          </button>
        </div>

        <div className={styles.formGroup}>
          <label>장비 지원 여부</label>
          <input {...register("equipment")} />
        </div>

        <div className={styles.formGroup}>
          <label>기타 요청 사항</label>
          <textarea {...register("otherRequests")} />
        </div>

        <button type="submit" className={styles.submitButton}>
          제출하기
        </button>
      </form>
    </div>
  );
}
