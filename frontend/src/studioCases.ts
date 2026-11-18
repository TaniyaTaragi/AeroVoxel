import type { ActiveCase } from "./types";

const specimens = {
  airfoil: { name: "NACA 0012", category: "Wing section" },
  drone: { name: "Quadcopter", category: "Stationary crossflow" },
  sports_car: { name: "Concept car", category: "Ground vehicle" },
  cylinder: { name: "Circular cylinder", category: "Bluff body" },
  sphere_3d: { name: "Sphere", category: "3D center slice" },
} as const;

export function specimenFor(id: string) {
  const item = specimens[id as keyof typeof specimens];
  return item ? { ...item, image: "/studio/" + id + ".webp" } : undefined;
}

export function orderSpecimens(cases: ActiveCase[]) {
  const order = Object.keys(specimens);
  return [...cases].sort((a, b) => {
    const rank = (id: string) => {
      const index = order.indexOf(id);
      return index < 0 ? order.length : index;
    };
    return rank(a.id) - rank(b.id);
  });
}
