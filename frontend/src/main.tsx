import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 추가
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter> {/* 앱을 감싸줍니다 */}
    <App />
  </BrowserRouter>
);