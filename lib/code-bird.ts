import type { CodeFace, Point3 } from "./code-sculpture";

/** A folded-paper crane, described entirely as vertices and triangular facets. */
export function codeBird(time: number): CodeFace[] {
  const faces: CodeFace[] = [];
  const bob = Math.sin(time * 1.5) * 0.07;
  const face = (a: Point3, b: Point3, c: Point3, accent = false) =>
    faces.push({
      vertices: [a, b, c].map(([x, y, z]) => [x, y + bob, z]) as [
        Point3,
        Point3,
        Point3,
      ],
      accent,
    });
  const front: Point3 = [0.65, 0.05, 0],
    rear: Point3 = [-0.65, 0, 0],
    ridge: Point3 = [-0.05, 0.42, 0],
    keel: Point3 = [0, -0.38, 0];
  for (const side of [-1, 1]) {
    const edge: Point3 = [0, 0.05, 0.3 * side];
    face(front, ridge, edge);
    face(rear, edge, ridge);
    face(front, edge, keel, true);
    face(rear, keel, edge);
    // Separate folds articulate around the root instead of scaling a flat silhouette.
    const flap = 0.12 + Math.sin(time * 2.1) * 0.24;
    const wing = (x: number, y: number, z: number): Point3 => [
      x,
      y * Math.cos(flap) - z * Math.sin(flap) + 0.18,
      (y * Math.sin(flap) + z * Math.cos(flap) + 0.2) * side,
    ];
    const root = wing(0.4, 0, 0),
      back = wing(-0.5, 0, 0),
      tip = wing(-0.7, 1.75, 1.8),
      leading = wing(0.45, 0.55, 1.15),
      fold = wing(-0.18, 0.48, 0.65);
    face(root, leading, fold);
    face(leading, tip, fold, true);
    face(tip, back, fold);
    face(back, root, fold);
    // The long upturned neck and pointed beak identify the crane at small sizes.
    const base: Point3 = [0.5, 0.05, side * 0.12],
      neck: Point3 = [1.04, 0.92, side * 0.07],
      head: Point3 = [1.08, 1.35, side * 0.055],
      beak: Point3 = [1.65, 1.05, 0];
    face(base, neck, [0.75, 0.1, 0]);
    face(neck, head, [0.75, 0.1, 0]);
    face(neck, beak, head, true);
    face(rear, [-1.7, 0.92, 0], [-0.52, 0.15, side * 0.18]);
  }
  return faces;
}
