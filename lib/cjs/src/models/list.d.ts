import { Model, type ModelProps } from "./model";
export declare class ListModel extends Model {
    constructor();
    getModelType(): typeof Model;
    items: Model[];
    getItems<T extends Model>(): T[];
    getItemById<T extends Model>(id: string): T | undefined;
    getItemByUid<T extends Model>(uid: string): T | undefined;
    replaceItem<T extends Model>(props: ModelProps<T>, nextProps: ModelProps<T>): void;
    addItem<T extends Model>(props: ModelProps<T>): void;
    addItems<T extends Model>(items: ModelProps<T>[]): void;
    setItems<T extends Model>(items: ModelProps<T>[]): void;
}
