import { CacheStore } from "@/data/protocols/cache";
import { SavePurchases } from "@/domain/usecases";

export class LocalPurchasesManager implements SavePurchases {
  private readonly key = "purchases";

  constructor(
    private readonly cacheStore: CacheStore,
    private readonly timeStamp: Date
  ) {}

  async save(purchases: SavePurchases.Params[]): Promise<void> {
    this.cacheStore.delete(this.key);
    this.cacheStore.insert(this.key, {
      timestamp: this.timeStamp,
      value: purchases,
    });
  }

  async loadAll(): Promise<void> {
    this.cacheStore.fetch(this.key);
  }
}
