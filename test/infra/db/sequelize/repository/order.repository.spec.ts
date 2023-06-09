import { Sequelize } from "sequelize-typescript";
import { Order, OrderItem } from "../../../../../src/domain/checkout/entity";
import { Customer } from "../../../../../src/domain/customer/entity";
import { Address } from "../../../../../src/domain/customer/value-object";
import { Product } from "../../../../../src/domain/product/entity";
import { OrderItemModel, OrderModel, OrderRepository } from "../../../../../src/infra/checkout/repository/sequelize";
import { ProductModel, ProductRepository } from "../../../../../src/infra/product/repository/sequelize";
import { CustomerModel, CustomerRepository } from "../../../../../src/infra/customer/repository/sequelize";


describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            CustomerModel,
            OrderModel,
            OrderItemModel,
            ProductModel,
        ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel!.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.getTotal(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });
    });

    it('should get one order', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderById = await orderRepository.find(order.id);

        expect(orderById).toStrictEqual(order)
    })

    it('should get a list of orders', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orders = await orderRepository.findAll();

        expect(orders).toStrictEqual([order])
    })

    it("update an existing order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModelBeforeUpdate = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModelBeforeUpdate!.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: 20,
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });

        const orderItemTwo = new OrderItem(
            "2",
            product.name,
            product.price,
            product.id,
            2
        );

        order.addItem(orderItemTwo)

        await orderRepository.update(order)

        const orderModelAfterUpdate = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModelAfterUpdate!.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: 40,
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
                {
                    id: orderItemTwo.id,
                    name: orderItemTwo.name,
                    price: orderItemTwo.price,
                    quantity: orderItemTwo.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });
    });
});