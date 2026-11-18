// Reuse the CPU demo data in the repository. Vite serves the arrays as assets.
const arrays = import.meta.glob<string>(
  "../../../backend/app/assets/flow/*_v1_*.npy",
  { eager: true, query: "?url", import: "default" },
);

export function bundledFieldUrls(id: string) {
  const path = "../../../backend/app/assets/flow/" + id;
  const urls = {
    velocity_url: arrays[path + "_velocity.npy"],
    pressure_url: arrays[path + "_pressure.npy"],
    mask_url: arrays[path + "_mask.npy"],
  };
  return Object.values(urls).every(Boolean) ? urls : null;
}
