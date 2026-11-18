export type MaskGrid = { mask: Uint8Array; nx: number; ny: number };

export const cellSize = (grid: Pick<MaskGrid, "nx">) =>
  16 / Math.max(grid.nx - 1, 1);

export const domainHeight = (grid?: Pick<MaskGrid, "nx" | "ny"> | null) =>
  grid ? cellSize(grid) * (grid.ny - 1) : 8;

export const isDemoModel = (id: string) =>
  /^(sports_car|drone|airfoil|cylinder|sphere_3d)(_v1)?$/.test(id);
