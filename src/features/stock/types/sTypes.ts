export type UnitName = "pcs" | "kg" | "g" | "l" | "ml";

export interface StockItem {
  id: string;
  name: string;
  icon?: string;        
  unit: UnitName;
  stock: number;        
  leftover: number;     
  createdAt: number;
  updatedAt: number;
}
