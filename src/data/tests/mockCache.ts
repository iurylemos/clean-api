import { CacheStore } from "@/data/protocols/cache";

const maxAgeInDays = 3;

export const getCacheExpirationDate = (timestamp: Date): Date => {
  const maxCacheAge = new Date(timestamp);
  maxCacheAge.setDate(maxCacheAge.getDate() - maxAgeInDays);
  return maxCacheAge;
};

export class CacheStoreSpy implements CacheStore {
  actions: CacheStoreSpy.Action[] = [];
  deleteKey: string;
  insertKey: string;
  insertValues: CacheStore.CacheStoreValue = {
    value: [],
  };
  fetchKey: string;

  delete(key: string): void {
    this.deleteKey = key;
    this.actions.push(CacheStoreSpy.Action.delete);
  }

  insert(key: string, { timestamp, value }: CacheStore.CacheStoreValue): void {
    this.insertKey = key;
    this.insertValues = { timestamp, value };
    this.actions.push(CacheStoreSpy.Action.insert);
  }

  fetch(key: string): CacheStore.CacheStoreValue {
    this.fetchKey = key;
    this.actions.push(CacheStoreSpy.Action.fetch);
    return this.insertValues;
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.delete);
      throw new Error();
    });
  }

  simulateFetchError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "fetch").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.fetch);
      throw new Error();
    });
  }
}

export namespace CacheStoreSpy {
  export enum Action {
    delete,
    insert,
    fetch,
  }
}
