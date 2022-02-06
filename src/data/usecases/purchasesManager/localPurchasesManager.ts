import { CachePolicy, CacheStore } from "@/data/protocols/cache";
import { SavePurchases, LoadPurchases } from "@/domain/usecases";
export class LocalPurchasesManager implements SavePurchases, LoadPurchases {
  private readonly key = "purchases";

  constructor(
    private readonly cacheStore: CacheStore,
    private readonly currentDate: Date
  ) {}

  async save(purchases: SavePurchases.Params[]): Promise<void> {
    this.cacheStore.delete(this.key);
    this.cacheStore.insert(this.key, {
      timestamp: this.currentDate,
      value: purchases,
    });
  }

  async loadAll(): Promise<LoadPurchases.Result[]> {
    try {
      const cache = this.cacheStore.fetch(this.key);
      if (CachePolicy.validate(cache.timestamp, this.currentDate))
        return cache.value;
      this.cacheStore.delete(this.key);
      return [];
    } catch (error) {
      return [];
    }
  }

  validate(): void {
    try {
      this.cacheStore.fetch(this.key);
    } catch (error) {
      this.cacheStore.delete(this.key);
    }
  }
}
