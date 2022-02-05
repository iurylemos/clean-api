import { SavePurchases } from "@/domain/usecases";
import { CacheStore } from "@/data/protocols/cache";

export class CacheStoreSpy implements CacheStore<SavePurchases.Params[]> {
  actions: CacheStoreSpy.Action[] = [];
  deleteKey: string;
  insertKey: string;
  insertValues: CacheStore.CacheStoreValue<SavePurchases.Params[]> = {
    value: [],
  };

  delete(key: string): void {
    this.deleteKey = key;
    this.actions.push(CacheStoreSpy.Action.delete);
  }

  insert(
    key: string,
    { timestamp, value }: CacheStore.CacheStoreValue<SavePurchases.Params[]>
  ): void {
    this.insertKey = key;
    this.insertValues = { timestamp, value };
    this.actions.push(CacheStoreSpy.Action.insert);
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.delete);
      throw new Error();
    });
  }
}

export namespace CacheStoreSpy {
  export enum Action {
    delete,
    insert,
  }
}
