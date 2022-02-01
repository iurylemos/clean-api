import { SavePurchases } from "@/domain/usecases";
import { CacheStore } from "@/data/protocols/cache";

export class CacheStoreSpy implements CacheStore<SavePurchases.Params[]> {
  deleteCallsCount = 0;
  insertCallsCount = 0;
  deleteKey: string;
  insertKey: string;
  insertValues: SavePurchases.Params[] = [];

  delete(key: string): void {
    this.deleteCallsCount++;
    this.deleteKey = key;
  }

  insert(key: string, value: SavePurchases.Params[]): void {
    this.insertCallsCount++;
    this.insertKey = key;
    this.insertValues = value;
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      throw new Error();
    });
  }
}
