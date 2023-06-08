import { Order, OrderItem } from "../../../../domain/checkout/entity";
import { OrderRepositoryInterface } from "../../../../domain/checkout/repository";
import { OrderItemModel } from "../model/order_item.model";
import { OrderModel } from "../model/order.model";

export class OrderRepository implements OrderRepositoryInterface {
    async update (entity: Order): Promise<void> {
        const sequelize = OrderModel.sequelize;
        await sequelize.transaction(async (t) => {
            await OrderItemModel.destroy({
                where: { order_id: entity.id },
                transaction: t,
            });
            const items = entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                order_id: entity.id,
            }));
            await OrderItemModel.bulkCreate(items, { transaction: t });
            await OrderModel.update(
                { total: entity.getTotal() },
                { where: { id: entity.id }, transaction: t }
            );
        });
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