export interface Region {
  name: string;
  color: string;
  boundaries: [number, number][];
}

const regions: Region[] = [
  {
    name: "Region 1",
    color: "#FF5733",
    boundaries: [
      [90, -180],
      [90, -61],
      [30, -61],
      [30, -180],
    ],
  },
  {
    name: "Region 2",
    color: "#33FF57",
    boundaries: [
      [90, -60],
      [90, 60],
      [30, 60],
      [30, -60],
    ],
  },
  {
    name: "Region 3",
    color: "#3357FF",
    boundaries: [
      [90, 61],
      [90, 180],
      [30, 180],
      [30, 61],
    ],
  },
  {
    name: "Region 4",
    color: "#FFD700",
    boundaries: [
      [29, -180],
      [29, -61],
      [-30, -61],
      [-30, -180],
    ],
  },
  {
    name: "Region 5",
    color: "#FF33A1",
    boundaries: [
      [29, -60],
      [29, 60],
      [-30, 60],
      [-30, -60],
    ],
  },
  {
    name: "Region 6",
    color: "#33FFF3",
    boundaries: [
      [29, 61],
      [29, 180],
      [-30, 180],
      [-30, 61],
    ],
  },
  {
    name: "Region 7",
    color: "#FF5733",
    boundaries: [
      [-31, -180],
      [-31, -61],
      [-90, -61],
      [-90, -180],
    ],
  },
  {
    name: "Region 8",
    color: "#33FF57",
    boundaries: [
      [-31, -60],
      [-31, 60],
      [-90, 60],
      [-90, -60],
    ],
  },
  {
    name: "Region 9",
    color: "#3357FF",
    boundaries: [
      [-31, 61],
      [-31, 180],
      [-90, 180],
      [-90, 61],
    ],
  },
];

export default regions;
