export interface CacheStore {
  delete: (key: string) => void;
  insert: (key: string, value: CacheStore.CacheStoreValue) => void;
  fetch: (key: string) => CacheStore.CacheStoreValue;
}

export namespace CacheStore {
  export type CacheStoreValue = {
    timestamp?: Date;
    value: any;
  };
}
