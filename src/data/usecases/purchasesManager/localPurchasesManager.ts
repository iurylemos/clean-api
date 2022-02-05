import { CacheStore } from "@/data/protocols/cache";
import { SavePurchases } from "@/domain/usecases";

export class LocalPurchasesManager implements SavePurchases {
  constructor(
    private readonly cacheStore: CacheStore<SavePurchases.Params[]>,
    private readonly timeStamp: Date
  ) {}

  async save(purchases: SavePurchases.Params[]): Promise<void> {
    this.cacheStore.delete("purchases");
    this.cacheStore.insert("purchases", {
      timestamp: this.timeStamp,
      value: purchases,
    });
  }
}
