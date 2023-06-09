import { Address } from "../../../src/domain/customer/value-object"
import { CustomerFactory } from "../../../src/domain/customer/factory/customer.factory"

describe('Customer factory unit tests', () => {

    it("should create a customer", () => {
        let customer = CustomerFactory.create("John")

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("John")
        expect(customer.Address).toBeUndefined()
    })

    it('should create a customer with an address', () => {
        const address = new Address("Street", 150, "ZIP", "City")

        let customer = CustomerFactory.createWithAddress("John", address)

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("John")
        expect(customer.Address).toBe(address)
    })

})