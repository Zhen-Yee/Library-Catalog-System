import {CatalogItemType} from "../../enums/catalogItemType";

export abstract class CatalogItem{
  id: number;
  qtyInStock: number;
  qtyOnLoan: number;
  titles: string;
  itemType: CatalogItemType;
}
