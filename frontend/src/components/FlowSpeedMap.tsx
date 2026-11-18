import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";
import type { FlowData } from "./WindTunnelViewer";

const palette = [
  [15, 23, 53],
  [46, 62, 120],
  [30, 131, 168],
  [62, 200, 196],
  [202, 241, 220],
];
const obstacle = [16, 25, 36];
const minimumLimit = 0.14; // Shared scale for the bundled demos.

function paintField(flow: FlowData) {
  const { nx, ny, mask, velocity } = flow;
  const count = nx * ny;
  const speed = new Float32Array(count);
  let max = 0;
  for (let i = 0; i < count; i++) {
    if (mask[i]) continue;
    const magnitude = Math.hypot(velocity[i], velocity[i + count]);
    if (!Number.isFinite(magnitude)) continue;
    speed[i] = magnitude;
    max = Math.max(max, magnitude);
  }
  const limit = Math.max(minimumLimit, Math.ceil(max / 0.02) * 0.02);
  const pixels = new Uint8ClampedArray(count * 4);
  for (let i = 0; i < count; i++) {
    const offset = i * 4;
    if (mask[i]) {
      pixels.set(obstacle, offset);
    } else {
      const t = Math.min(speed[i] / limit, 1) * (palette.length - 1);
      const stop = Math.min(Math.floor(t), palette.length - 2);
      const blend = t - stop;
      const [from, to] = [palette[stop], palette[stop + 1]];
      for (let channel = 0; channel < 3; channel++) {
        pixels[offset + channel] = from[channel] + (to[channel] - from[channel]) * blend;
      }
    }
    pixels[offset + 3] = 255;
  }
  return { pixels, limit };
}

export function FlowSpeedMap({ flow }: { flow: FlowData }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { pixels, limit } = useMemo(() => paintField(flow), [flow]);

  useEffect(() => {
    const context = canvas.current?.getContext("2d");
    if (context) context.putImageData(new ImageData(pixels, flow.nx, flow.ny), 0, 0);
  }, [pixels, flow.nx, flow.ny]);

  return (
    <section className="speed-map" aria-label="Speed map from the solver field">
      <figure className="speed-map-sheet" style={{ "--field-aspect": flow.nx / flow.ny } as CSSProperties}>
        <div className="speed-map-axes" aria-hidden="true">
          <span>Inlet</span><span>Outlet</span>
        </div>
        <canvas
          ref={canvas}
          width={flow.nx}
          height={flow.ny}
          role="img"
          aria-label={"2D velocity magnitude across " + flow.nx + " by " + flow.ny + " solver cells. Dark cells mark the obstacle."}
        />
        <figcaption className="speed-map-caption">
          <span className="speed-map-obstacle"><i aria-hidden="true" /> Solid cells</span>
          <div className="speed-map-scale">
            <strong>Speed · lattice units</strong>
            <div className="speed-map-ramp" aria-hidden="true" />
            <div className="speed-map-ticks"><span>0</span><span>{(limit / 2).toFixed(2)}</span><span>{limit.toFixed(2)}</span></div>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}
