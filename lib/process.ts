/**
 * The OBRA production timeline.
 *
 * Single source of truth for the homepage process grid and the festival
 * landing page timeline, so the indicative nine-week route only ever needs
 * changing in one place.
 */

export type ProcessStage = {
  /** Two-digit editorial index. */
  n: string;
  title: string;
  /** Display label, e.g. "Week 1". */
  week: string;
  /** Numeric week, used for timeline weighting. */
  weekNo: number;
};

export const processStages: ProcessStage[] = [
  { n: "01", title: "Brief", week: "Week 1", weekNo: 1 },
  { n: "02", title: "Design", week: "Week 2", weekNo: 2 },
  { n: "03", title: "Approvals", week: "Week 3", weekNo: 3 },
  { n: "04", title: "Sampling", week: "Week 4", weekNo: 4 },
  { n: "05", title: "Production", week: "Week 6", weekNo: 6 },
  { n: "06", title: "Delivery", week: "Week 9", weekNo: 9 },
];
