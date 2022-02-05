export interface CacheStore<T> {
  delete: (key: string) => void;
  insert: (key: string, value: CacheStore.CacheStoreValue<T>) => void;
}

export namespace CacheStore {
  export type CacheStoreValue<T> = {
    timestamp?: Date;
    value: T;
  };
}
