import { Container } from "@mui/material";
import "../scss/info-page.scss";

const projects = [
  { value: "6", label: "Labs" },
  { value: "16", label: "Orchids" },
  { value: "9", label: "Techs" },
  { value: "1", label: "Project" },
];

const features = [
  "React Components with Container/Presentational pattern",
  "Custom Hooks for theme management",
  "React Router for SPA navigation",
  "MUI component library integration",
  "SCSS preprocessor with variables & mixins",
  "Redux Toolkit state management",
  "Form validation with Formik & Yup",
  "REST API integration with Axios",
];

function InfoPage() {
  return (
    <div className="info-page">
      <div className="info-hero">
        <div className="info-avatar">👨‍💻</div>
        <h1>
          Hello, I'm <span className="highlight">Vương Quân</span>
        </h1>
        <p>Software Engineering Student · FPT University HCMC</p>
      </div>

      <div className="profile-section">
        <div className="profile-left">
          <div className="profile-avatar">🐾</div>
          <div className="profile-info">
            <h3>Claw — Your Coding Buddy</h3>
            <p>Built with 🤖 by OpenClaw</p>
          </div>
        </div>
        <div className="profile-stats">
          {projects.map((p) => (
            <div className="stat" key={p.label}>
              <div className="stat-value">{p.value}</div>
              <div className="stat-label">{p.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-grid">
        <div className="info-column">
          <div className="info-card">
            <h2>📖 About This Project</h2>
            <p>
              This is my FER202 React lab project — a comprehensive orchid showcase built
              iteratively through 6 labs. Each lab added new capabilities to the same codebase:
              starting from basic components, through hooks and routing, to UI libraries,
              CSS preprocessing, and finally API integration with full CRUD.
            </p>
          </div>

          <div className="info-card">
            <h2>🛠️ Technologies</h2>
            <div className="tech-grid">
              {["React 19", "Vite", "React Router", "MUI", "SCSS", "Redux Toolkit"].map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
              <span className="tech-badge special">Formik + Yup</span>
              <span className="tech-badge special">Axios</span>
            </div>
          </div>
        </div>

        <div className="info-column">
          <div className="info-card">
            <h2>⚡ Key Features</h2>
            <ul className="feature-list">
              {features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
