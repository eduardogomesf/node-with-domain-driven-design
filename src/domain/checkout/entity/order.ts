import { OrderItem } from "./order_item"

export class Order {

    private _id: string
    private _customerId: string
    private _items: OrderItem[] = []
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id
        this._customerId = customerId
        this._items = items
        this._total = this.getTotal()
        this.validate()
    }

    getTotal (): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0)
    }

    validate () {
        if (this._id.length === 0) {
            throw new Error('Id is required')
        }

        if (this._customerId.length === 0) {
            throw new Error('CustomerId is required')
        }

        if (this._items.length === 0) {
            throw new Error('Items quantity must be greater than 0')
        }

        if (this._items.some(item => item.quantity <= 0)) {
            throw new Error('Item quantity must be greater than zero')
        }
    }

    addItem (item: OrderItem) {
        this._items.push(item)
        this._total = this.getTotal()
    }

    get items () {
        return this._items
    }

    get id () {
        return this._id
    }

    get customerId () {
        return this._customerId
    }

    get total () {
        return this._total
    }
}