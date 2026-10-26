export type Edge = [number, number];

/** One GCN propagation step (Kipf & Welling, 2017) with W = I and no nonlinearity:
 *  h'_v = sum over u in N(v) ∪ {v} of h_u / sqrt((d_u + 1)(d_v + 1)). */
export const propagate = (n: number, edges: Edge[], h: number[]): number[] => {
  const nbrs: number[][] = Array.from({ length: n }, (_, v) => [v]);
  edges.forEach(([a, b]) => {
    nbrs[a].push(b);
    nbrs[b].push(a);
  });
  const deg = nbrs.map((x) => x.length);
  return nbrs.map((ns, v) => ns.reduce((s, u) => s + h[u] / Math.sqrt(deg[u] * deg[v]), 0));
};
