import { PurchaseModel } from '../models'

export interface SavePurchases {
  save: (purchases: SavePurchases.Params[]) => Promise<void>;
}

export namespace SavePurchases {
  export type Params = PurchaseModel;
}
