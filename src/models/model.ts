import { action, makeObservable, observable } from "mobx";

export type ModelProps<T> = {
  [K in keyof T]?: T[K];
};

export class Model {

  uid = String(Math.random()).substring(2)

  @observable id!: string

  @action setProps<T extends this>(props: ModelProps<T>) {
    Object.assign(this, props)
  }

  static create<T extends Model, U extends ModelProps<T>>(this: new () => T, props?: U): T {
    const model = makeObservable(new this()) as T;
    if (props) model.setProps(props)
    return model
  }

}

