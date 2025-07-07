# 📍 대광PC 현장 지도 기능 개발 내역 (2025.07.07)

## ✅ 주요 기능 구현 사항

### 1. Naver Map 연동

- `naver.maps` 라이브러리를 이용한 지도 렌더링 구현
- 초기 중심 좌표 설정: `35.1736, 126.8107` (광주 광산구 기준)
- 줌 컨트롤 UI 위치 지정 (`TOP_RIGHT`)

### 2. Supabase 연동 및 좌표 마커 표시

- Supabase의 `project_locations` 테이블로부터 시공지 주소 목록 Fetch
- 각 주소에 대해 Naver Geocoder API를 활용해 위/경도 변환
- 변환된 좌표에 마커 표시 및 지도에 렌더링

### 3. 캐싱 및 성능 최적화

- 세션 스토리지(`sessionStorage`)에 위치 정보 캐싱 (`geocodedLocations`, `locationData`)
- 최초 1회만 Supabase + Geocoder 요청
- 이후 새로고침 시에는 캐시된 데이터로 빠르게 렌더링

### 4. 커스텀 마커 디자인

- SVG 로고(`logo_line_white.svg`)를 삽입한 커스텀 마커 구현
- `대광PC` 사무실 위치에만 특별 스타일 마커 적용 (파란 배경, 흰 글자, 둥근 모서리, 아이콘 포함)

### 5. 오류 핸들링 및 예외 처리

- Geocoder 실패 시 콘솔 로그로 주소 출력
- `window.naver` 객체 유무 확인 후 지도 로딩 수행
- `any` 타입 에러 무시 주석 적용 (`// @ts-ignore`) 및 `as any` 단언으로 타입 우회 처리

---

## 🔧 향후 개선 예정

- 마커 클릭 시 시공 정보 인포윈도우 표시
- 마커 색상 커스터마이징 (지역 또는 상태에 따라 구분)
- 모바일 대응 지도 UI 및 반응형 스타일 조정

---

## 📦 사용 기술 스택

- React (Vite)
- TypeScript
- Supabase (PostgreSQL)
- Naver Maps JavaScript API v3
