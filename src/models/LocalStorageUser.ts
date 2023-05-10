export interface LocalStorageUser {
  tokens: {
    refresh: string;
    access: string;
  };
  username: string;
  role: string;
}
