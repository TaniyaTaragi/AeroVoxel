import { ArrowDown, ArrowRight, ArrowUpRight, Upload, Wind } from "lucide-react";
import { specimenFor } from "../studioCases";
import type { ActiveCase } from "../types";

interface Props {
  cases: ActiveCase[];
  onTryDemo: (caseId?: string) => void;
  onUpload: () => void;
}

export function LandingScreen({ cases, onTryDemo, onUpload }: Props) {
  return (
    <div className="landing-screen">
      <header className="landing-nav">
        <a className="brand" href="#overview" aria-label="AeroVoxel home">
          <span className="logo-icon"><Wind size={20} /></span>
          <strong>AeroVoxel</strong>
        </a>
        <nav aria-label="Overview">
          <a href="#specimens">Specimen library</a>
          <button className="secondary-button landing-nav-action" onClick={() => onTryDemo()}>
            Open tunnel <ArrowUpRight size={16} />
          </button>
        </nav>
      </header>
      <main id="overview">
        <section className="landing-hero" aria-labelledby="landing-title">
          <img className="landing-art" src="/studio/airfoil-studio.webp" alt="" fetchPriority="high" />
          <div className="landing-content">
            <p className="eyebrow"><span /> Virtual wind tunnel</p>
            <h1 id="landing-title">See how<br />air moves.</h1>
            <p className="landing-pitch">
              Follow airflow around an airfoil, a quadcopter, or a shape of your own.
            </p>
            <div className="landing-actions">
              <button className="primary-button" onClick={() => onTryDemo()}>
                Explore the tunnel <ArrowRight size={18} />
              </button>
              <button className="secondary-button" onClick={onUpload}>
                <Upload size={16} /> Upload a capture
              </button>
            </div>
          </div>
          <a className="landing-scroll" href="#specimens">
            <ArrowDown size={15} /> Explore specimens
          </a>
          <span className="art-credit">Wind tunnel illustration</span>
        </section>
        <section className="specimen-gallery" id="specimens" aria-labelledby="specimens-title">
          <div className="gallery-heading">
            <h2 id="specimens-title">Specimen library</h2>
            <p>Choose a shape to see how its geometry changes the flow.</p>
          </div>
          <div className="gallery-grid">
            {cases.map((item) => {
              const specimen = specimenFor(item.id);
              if (!specimen) return null;
              return (
                <button className="gallery-item" key={item.id} onClick={() => onTryDemo(item.id)}>
                  <span className="gallery-picture"><img src={specimen.image} alt="" loading="lazy" /></span>
                  <span className="gallery-name">
                    <span><strong>{specimen.name}</strong><small>{specimen.category}</small></span>
                    <ArrowUpRight size={19} />
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </main>
      <footer className="landing-footer">
        <span>AeroVoxel</span>
        <span>Educational airflow simulation</span>
      </footer>
    </div>
  );
}
