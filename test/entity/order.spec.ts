import { Order } from '../../src/entity/order'
import { OrderItem } from '../../src/entity/order_item'

describe('Order unit tests', () => {

    it('should throw error when id is empty', () => {
        expect(() => {
            let order = new Order('', "123", [])
        }).toThrowError("Id is required")
    })

    it('should throw error when customerId is empty', () => {
        expect(() => {
            let order = new Order('123', "", [])
        }).toThrowError("CustomerId is required")
    })

    it('should throw error when items quantity is less than 0', () => {
        expect(() => {
            let order = new Order('123', "321", [])
        }).toThrowError("Items quantity must be greater than 0")
    })

    it('should calculate total', () => {
        const item = new OrderItem('i1', 'Item 1', 100)
        const item2 = new OrderItem('i2', 'Item 2', 200)

        const order = new Order('o1', 'c1', [item, item2])

        const total = order.total()

        expect(total).toBe(300)
    })

})