export type PortfolioSectors = {
  [key: string]: PortfolioSector;
};

export type PortfolioSector = {
  industries: { [key: string]: PortfolioIndustry };
  currentValue: number;
  totalCostBasis: number;
  percentGain: number;
  percentOfAccount: number;
  sectorName: string;
  sectorId: number;
  id?: number;
};

export type PortfolioIndustry = {
  currentValue: number;
  totalCostBasis: number;
  positions: { [key: string]: PortfolioPosition };
  percentGain: number;
  industryName: string;
  percentOfAccount: number;
  id?: number;
  industryId: number;
};

export type PositionGroup = {
  [key: string]: PortfolioPosition;
};

export type PortfolioPosition = {
  companyName: string;
  currentValue: number;
  totalCostBasis: number;
  percentGain: number;
  quantity: number;
  id?: number;
  positionId: number;
};

export enum GroupType {
  SECTOR,
  INDUSTRY,
  POSITION,
}

export type GroupValuesFactory = {
  createPortfolioPosition: () => PortfolioPosition;
  createPortfolioIndustry: () => PortfolioIndustry;
  createPortfolioSector: () => PortfolioSector;
};

export type GroupValues = {
  portfolioSector: PortfolioSector;
  portfolioIndustry: PortfolioIndustry;
  portfolioPosition: PortfolioPosition;
};
