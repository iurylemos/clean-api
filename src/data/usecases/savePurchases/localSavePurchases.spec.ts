import { CacheStore } from "@/data/protocols/cache";
import { LocalSavePurchases } from "@/data/usecases";

class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0;
  insertCallsCount = 0;
  deleteKey: string;
  insertKey: string;

  delete(key: string): void {
    this.deleteCallsCount++;
    this.deleteKey = key;
  }

  insert(key: string): void {
    this.insertCallsCount++;
    this.insertKey = key;
  }
}

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
  it("should not delete cache on sut.init", () => {
    const { cacheStore } = makeSut();
    new LocalSavePurchases(cacheStore);
    expect(cacheStore.deleteCallsCount).toBe(0);
  });

  it("should delete old cache on sut.save", async () => {
    const { cacheStore, sut } = makeSut();
    await sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
  });

  it("should call delete with correct key", async () => {
    const { cacheStore, sut } = makeSut();
    await sut.save();
    expect(cacheStore.deleteKey).toBe("purchases");
  });

  it("should not insert new Cache if delete fails", () => {
    const { cacheStore, sut } = makeSut();

    jest.spyOn(cacheStore, "delete").mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.save();
    expect(cacheStore.insertCallsCount).toBe(0);
    expect(promise).rejects.toThrow();
  });

  it("should insert new cache if delete succeeds", async () => {
    const { cacheStore, sut } = makeSut();
    await sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.insertCallsCount).toBe(1);
    expect(cacheStore.insertKey).toBe("purchases");
  });
});
