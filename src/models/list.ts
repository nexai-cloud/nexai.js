import { action, makeObservable, observable } from "mobx";
import { Model, type ModelProps } from "./model";

export class ListModel extends Model {

  constructor() {
    super()
    makeObservable(this, {
      items: observable,
      replaceItem: action,
      addItem: action,
      addItems: action,
      setItems: action,
    })
  }

  getModelType(): typeof Model {
    return Model
  }

  items:Model[] = []

  getItems<T extends Model>(): T[] {
    return this.items as T[]
  }

  getItemById<T extends Model>(id: string): T|undefined {
    return this.getItems<T>()
      .find(item => item.id === id)
  }

  getItemByUid<T extends Model>(uid: string): T|undefined {
    return this.getItems<T>()
      .find(item => item.uid === uid)
  }

  replaceItem<T extends Model>(
    props: ModelProps<T>,
    nextProps: ModelProps<T>
  ) {
    const item = this.getItemByUid(props.uid!)
    this.items.splice(
      this.items.indexOf(item!),
      1,
      this.getModelType().create(nextProps)
    )
  }

  addItem<T extends Model>(
    props: ModelProps<T>
  ) {
    this.items.push(
      this.getModelType().create(props)
    )
  }

  addItems<T extends Model>(
    items: ModelProps<T>[]
  ) {
    this.items.push(
      ...items.map(
        props => this.getModelType().create(props)
      )
    )
  }

  setItems<T extends Model>(
    items: ModelProps<T>[]
  ) {
    this.items.splice(
      0, 
      this.items.length,
      ...items.map(
        props => this.getModelType().create(props)
      )
    )
  }
}