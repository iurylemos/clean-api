import { mockPurchases, CacheStoreSpy } from "@/data/tests";
import { LocalSavePurchases } from "@/data/usecases";

type SutTypes = {
  sut: LocalSavePurchases;
  cacheStore: CacheStoreSpy;
};

const makeSut = (): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);
  return { cacheStore, sut };
};

describe("Local Save Purchases", () => {
  it("should not delete or insert cache on sut.init", () => {
    const { cacheStore } = makeSut();
    new LocalSavePurchases(cacheStore);
    expect(cacheStore.messages).toEqual([]);
  });

  it("should delete old cache on sut.save", async () => {
    const { cacheStore, sut } = makeSut();
    await sut.save(mockPurchases());
    expect(cacheStore.messages).toEqual([
      CacheStoreSpy.Message.delete,
      CacheStoreSpy.Message.insert,
    ]);
    expect(cacheStore.deleteKey).toBe("purchases");
  });

  it("should not insert new Cache if delete fails", () => {
    const { cacheStore, sut } = makeSut();

    cacheStore.simulateDeleteError();
    const promise = sut.save(mockPurchases());
    expect(cacheStore.messages).toEqual([CacheStoreSpy.Message.delete]);
    expect(promise).rejects.toThrow();
  });

  it("should insert new cache if delete succeeds", async () => {
    const { cacheStore, sut } = makeSut();
    const purchases = mockPurchases();
    await sut.save(purchases);
    expect(cacheStore.messages).toEqual([
      CacheStoreSpy.Message.delete,
      CacheStoreSpy.Message.insert,
    ]);
    expect(cacheStore.insertKey).toBe("purchases");
    expect(cacheStore.insertValues).toEqual(purchases);
  });
});
