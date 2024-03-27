const meta = import.meta;
export const getEnv = (name) => {
    return typeof process !== 'undefined'
        ? process.env[name]
        : meta.env[name];
};
