interface Position {
  id: number;

  symbol: string;

  quantity: number;

  costPerShare: number;

  userId: number;

  companyProfileId: number;

  industryId: number;
  industryName: string;
  companyName: string;
  sectorId: number;
  sectorName: string;
  totalCostBasis: number;
  percentGain: number;
  currentValue: number;
}
