// TODO: Figure out a generic way of check if strings are dates and converting for all attributes

interface I {
  createdAt: Date;
  updatedAt: Date;
}

export const parseDates = <T>(obj: T & I & {updatedAt: string, createdAt: string}): T & I => Object.assign(obj, {
  createdAt: new Date(obj.createdAt), updatedAt: new Date(obj.updatedAt)
});
