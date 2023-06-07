import { Address } from '../../../src/domain/entity/address'
import { Customer } from '../../../src/domain/entity/customer'
import { EventDispatcher } from '../../../src/domain/event/@shared/event-dispatcher'
import { EnviaConsoleLog1Handler } from '../../../src/domain/event/customer/handler/envia-console-log-1.handler'
import { EnviaConsoleLog2Handler } from '../../../src/domain/event/customer/handler/envia-console-log-2.handler'
import { EnviaConsoleLogHandler } from '../../../src/domain/event/customer/handler/envia-console-log.handler'

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

    it('should call event handlers when creating a new customer', () => {
        const eventDispatcher = new EventDispatcher()
        const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler()
        const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler()

        eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog1Handler)
        eventDispatcher.register("CustomerCreatedEvent", enviaConsoleLog2Handler)

        const firstHandleSpy = jest.spyOn(enviaConsoleLog1Handler, 'handle')
        const secondHandleSpy = jest.spyOn(enviaConsoleLog2Handler, 'handle')

        const customer = new Customer('1', 'Customer 1', eventDispatcher)

        expect(customer).toBeDefined()
        expect(firstHandleSpy).toHaveBeenCalled()
        expect(secondHandleSpy).toHaveBeenCalled()
    })

    it('should call event handlers when changing the address of a customer', () => {
        const eventDispatcher = new EventDispatcher()
        const enviaConsoleLogHandler = new EnviaConsoleLogHandler()

        eventDispatcher.register("ChangeAddressEvent", enviaConsoleLogHandler)

        const handleSpy = jest.spyOn(enviaConsoleLogHandler, 'handle')

        const customer = new Customer('1', 'Customer 1', eventDispatcher)
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");

        customer.changeAddress(address);

        expect(customer).toBeDefined()
        expect(handleSpy).toHaveBeenCalled()
    })

})