import { OrderItem, Order } from '../../../src/domain/checkout/entity'
import { Customer } from '../../../src/domain/customer/entity'
import { OrderService } from '../../../src/domain/checkout/service'

describe('Order service unit tests', () => {

    it('should get total of all orders', () => {
        const item1 = new OrderItem('oi1', 'Item 1', 100, 'p1', 1)
        const item2 = new OrderItem('oi2', 'Item 2', 200, 'p2', 2)

        const order1 = new Order('o1', 'c1', [item1])
        const order2 = new Order('o2', 'c2', [item2])

        const total = OrderService.total([order1, order2])

        expect(total).toBe(500)
    })

    it('should place an order', () => {
        const customer = new Customer('c1', 'Customer 1',)
        const item1 = new OrderItem('oi1', 'Item 1', 10, 'p1', 1)

        const order = OrderService.placeOrder(customer, [item1])

        expect(customer.rewardPoints).toBe(5)
        expect(order.getTotal()).toBe(10)
    })

})