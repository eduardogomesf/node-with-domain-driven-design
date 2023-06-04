import { Order } from "../../../../domain/entity/order";
import { OrderItemModel } from "../model/order_item.model";
import { OrderModel } from "../model/order.model";
import { OrderRepositoryInterface } from "../../../../domain/repository/order.repository";
import { OrderItem } from "../../../../domain/entity/order_item";

export class OrderRepository implements OrderRepositoryInterface {
    async update (entity: Order): Promise<void> {
        await OrderModel.update(
            {
                customerId: entity.customerId,
                items: [entity.items],
                total: entity.getTotal()
            },
            {
                where: {
                    id: entity.id
                }
            },
        )
    }

    async find (id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({ where: { id }, include: [{ model: OrderItemModel }] })

        const items = orderModel.items.map((item) => {
            return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
        })

        const order = new Order(orderModel.id, orderModel.customer_id, items)

        return order
    }

    async findAll (): Promise<Order[]> {
        const ordersModel = await OrderModel.findAll({ include: [{ model: OrderItemModel }] })

        const orders = ordersModel.map(orderModel => {
            const items = orderModel.items.map((item) => {
                return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
            })

            return new Order(orderModel.id, orderModel.customer_id, items)
        })

        return orders
    }

    async create (entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.getTotal(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{ model: OrderItemModel }],
            }
        );
    }
}