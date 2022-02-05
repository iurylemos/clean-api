export interface CacheStore {
  delete: (key: string) => void;
  insert: (key: string, value: CacheStore.CacheStoreValue) => void;
  fetch: (key: string) => void;
}

export namespace CacheStore {
  export type CacheStoreValue = {
    timestamp?: Date;
    value: any;
  };
}
