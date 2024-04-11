export type ModelProps<T> = {
    [K in keyof T]?: T[K];
};
export declare class Model {
    uid: string;
    id: string;
    setProps<T extends this>(props: ModelProps<T>): void;
    static create<T extends Model, U extends ModelProps<T>>(this: new () => T, props?: U): T;
}
