import { createRoot } from "react-dom/client";

import "./styles/global.scss";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
