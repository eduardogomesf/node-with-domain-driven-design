import { Order } from "../entity/order";

export class OrderService {

    static total (orders: Order[]) {
        return orders.reduce((acc, order) => acc + order.total(), 0)
    }

}