import { SavePurchases } from "@/domain/usecases";
import { CacheStore } from "@/data/protocols/cache";

export class CacheStoreSpy implements CacheStore<SavePurchases.Params[]> {
  messages: CacheStoreSpy.Message[] = [];
  deleteKey: string;
  insertKey: string;
  insertValues: SavePurchases.Params[] = [];

  delete(key: string): void {
    this.deleteKey = key;
    this.messages.push(CacheStoreSpy.Message.delete);
  }

  insert(key: string, value: SavePurchases.Params[]): void {
    this.insertKey = key;
    this.insertValues = value;
    this.messages.push(CacheStoreSpy.Message.insert);
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpy.Message.delete);
      throw new Error();
    });
  }
}

export namespace CacheStoreSpy {
  export enum Message {
    delete,
    insert,
  }
}
