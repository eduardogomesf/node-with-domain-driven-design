import { Address } from '../../../src/domain/entity/address'
import { Customer } from '../../../src/domain/entity/customer'

describe('Customer unit tests', () => {

    it('should throw error when id is empty', () => {
        expect(() => {
            new Customer('', "Edu")
        }).toThrow("Id is required")
    })

    it('should throw error when name is empty', () => {
        expect(() => {
            new Customer('1', "")
        }).toThrow("Name is required")
    })

    it('should change name', () => {
        // Triple A

        // Arrange
        const customer = new Customer("123", 'John')

        // Act
        customer.changeName("Jane")

        // Assert
        expect(customer.name).toBe("Jane")
    })

    it('should activate customer', () => {
        const customer = new Customer("123", 'John')
        const address = new Address('Street 1', 123, '12321421-532', 'São Paulo')
        customer.Address = address

        customer.activate()

        expect(customer.isActive()).toBe(true)
    })

    it('should throw error when address is not defined when you activate a customer', () => {
        const customer = new Customer("123", 'John')

        expect(() => {
            customer.activate()
        }).toThrowError("Address is required")
    })

    it('should deactivate customer', () => {
        const customer = new Customer("123", 'John')

        customer.deactivate()

        expect(customer.isActive()).toBe(false)
    })

    it('should add reward points', () => {
        const customer = new Customer('1', 'Customer 1')
        expect(customer.rewardPoints).toBe(0)

        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(10)

        customer.addRewardPoints(10)
        expect(customer.rewardPoints).toBe(20)
    })

})