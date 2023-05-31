import { Address } from "./entity/address";
import { Customer } from "./entity/customer";
import { Order } from "./entity/order";
import { OrderItem } from "./entity/order_item";

// Aggregate One
let customer = new Customer('123', 'Edu')
const address = new Address('Rua Dois', 2, '12345-678', 'São Paulo')
customer.Address = address
customer.activate()

// Aggregate Two
const item1 = new OrderItem('1', 'Item 1', 10)
const item2 = new OrderItem('2', 'Item 2', 10)
const order = new Order('1', '123', [item1, item2])
