const COLORS = {
  red: "rgb(255, 74, 74)",
  green: "rgb(104, 255, 74)",
  blue: "rgba(111, 190, 255, 0.72)",
  yellow: "rgb(252, 255, 74)",
  orange: "rgb(255, 177, 74)",
};

export const PRIORITY_COLORS = {
  Critical: COLORS.red,
  High: COLORS.orange,
  Normal: COLORS.yellow,
  Low: COLORS.green,
};

export const STATUS_COLORS = {
  InProgress: COLORS.blue,
  OnHold: COLORS.yellow,
  Fixed: COLORS.green,
};
