export type Context = {
  loggedInUserId?: string;
};

export enum FileType {
  image = 'image',
  video = 'video',
}

export enum PermissionType {
  READ = 1,
  CREATE = 2,
  DELETE = 3,
  UPDATE = 4,
}

export enum ModuleType {
  USERS = 1,
  ROLES = 2,
}
