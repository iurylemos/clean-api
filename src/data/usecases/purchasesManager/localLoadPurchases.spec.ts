import {
  CacheStoreSpy,
  mockPurchases,
  getCacheExpirationDate,
} from "@/data/tests";
import { LocalPurchasesManager } from "@/data/usecases";

type SutTypes = {
  sut: LocalPurchasesManager;
  cacheStore: CacheStoreSpy;
};

const makeSut = (timestamp = new Date()): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalPurchasesManager(cacheStore, timestamp);
  return { cacheStore, sut };
};

describe("Local Load Purchases", () => {
  it("should not delete or insert cache on sut.init", () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.actions).toEqual([]);
  });

  it("should call correct key on load", async () => {
    const { cacheStore, sut } = makeSut();
    await sut.loadAll();
    expect(cacheStore.actions).toEqual([
      CacheStoreSpy.Action.fetch,
      CacheStoreSpy.Action.delete,
    ]);
    expect(cacheStore.fetchKey).toBe("purchases");
  });

  it("should return empty list if load fails", async () => {
    const { cacheStore, sut } = makeSut();
    cacheStore.simulateFetchError();
    const purchases = await sut.loadAll();
    expect(cacheStore.actions).toEqual([
      CacheStoreSpy.Action.fetch,
      CacheStoreSpy.Action.delete,
    ]);
    expect(cacheStore.deleteKey).toBe("purchases");
    expect(purchases).toEqual([]);
  });

  it("should return a list of purchases if cache is valid", async () => {
    const currentDate = new Date();
    const timestamp = getCacheExpirationDate(currentDate);
    timestamp.setSeconds(timestamp.getSeconds() + 1);
    const { cacheStore, sut } = makeSut(currentDate);
    cacheStore.insert("purchases", { timestamp, value: mockPurchases() });
    const purchases = await sut.loadAll();
    expect(cacheStore.actions).toEqual([
      CacheStoreSpy.Action.insert,
      CacheStoreSpy.Action.fetch,
    ]);
    expect(purchases).toEqual(cacheStore.insertValues.value);
  });

  it("should return an empty list if cache is expired", async () => {
    const currentDate = new Date();
    const timestamp = getCacheExpirationDate(currentDate);
    timestamp.setSeconds(timestamp.getSeconds() - 1);
    const { cacheStore, sut } = makeSut(currentDate);
    cacheStore.insert("purchases", { timestamp, value: mockPurchases() });
    const purchases = await sut.loadAll();
    expect(cacheStore.actions).toEqual([
      CacheStoreSpy.Action.insert,
      CacheStoreSpy.Action.fetch,
      CacheStoreSpy.Action.delete,
    ]);
    expect(cacheStore.deleteKey).toBe("purchases");
    expect(purchases).toEqual([]);
  });

  it("should return an empty list if cache is on expiration date", async () => {
    const currentDate = new Date();
    const timestamp = getCacheExpirationDate(currentDate);
    const { cacheStore, sut } = makeSut(currentDate);
    cacheStore.insert("purchases", { timestamp, value: mockPurchases() });
    const purchases = await sut.loadAll();
    expect(cacheStore.actions).toEqual([
      CacheStoreSpy.Action.insert,
      CacheStoreSpy.Action.fetch,
      CacheStoreSpy.Action.delete,
    ]);
    expect(cacheStore.deleteKey).toBe("purchases");
    expect(purchases).toEqual([]);
  });

  it("should return an empty list if cache empty", async () => {
    const currentDate = new Date();
    const timestamp = getCacheExpirationDate(currentDate);
    timestamp.setSeconds(timestamp.getSeconds() + 1);
    const { cacheStore, sut } = makeSut(currentDate);
    cacheStore.insert("purchases", { timestamp, value: [] });
    const purchases = await sut.loadAll();
    expect(cacheStore.actions).toEqual([
      CacheStoreSpy.Action.insert,
      CacheStoreSpy.Action.fetch,
    ]);
    expect(purchases).toEqual([]);
  });
});
