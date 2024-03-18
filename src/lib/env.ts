import.meta.env

export const getEnv = (name: string) => {
  return typeof process !== 'undefined'
    ? process.env[name]
    : import.meta.env[name]
}