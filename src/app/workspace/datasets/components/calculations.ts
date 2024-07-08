// utils/correlation.ts
export const calculateCorrelationMatrix = (data: any[], columns: string[]) => {
  const n = data.length;
  const mean = (arr: number[]) => arr.reduce((acc, val) => acc + val, 0) / arr.length;
  const stdDev = (arr: number[], mean: number) =>
    Math.sqrt(arr.reduce((acc, val) => acc + (val - mean) ** 2, 0) / arr.length);

  const correlations: Record<string, Record<string, number>> = {};

  columns.forEach((col1) => {
    correlations[col1] = {};
    columns.forEach((col2) => {
      const mean1 = mean(data.map((d) => d[col1]));
      const mean2 = mean(data.map((d) => d[col2]));
      const stdDev1 = stdDev(data.map((d) => d[col1]), mean1);
      const stdDev2 = stdDev(data.map((d) => d[col2]), mean2);

      const covariance =
        data.reduce((acc, val) => acc + (val[col1] - mean1) * (val[col2] - mean2), 0) / n;
      correlations[col1][col2] = covariance / (stdDev1 * stdDev2);
    });
  });

  return correlations;
};
