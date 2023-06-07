import { EventDispatcher } from '../../../../src/domain/event/@shared/event-dispatcher'
import { SendEmailWhenProductIsCreatedHandler } from '../../../../src/domain/event/product/handler/send-email-when-product-is-created.handler'
import { ProductCreatedEvent } from '../../../../src/domain/event/product/product-created.event'

describe('Domain events tests', () => {

    it('should register an event handler', () => {
        const eventDistpacher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDistpacher.register('ProductCreatedEvent', eventHandler)

        expect(eventDistpacher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
        expect(eventDistpacher.getEventHandlers['ProductCreatedEvent'].length).toBe(1)
        expect(eventDistpacher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)
    })

    it('should unregister an event', () => {
        const eventDistpacher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDistpacher.register('ProductCreatedEvent', eventHandler)

        expect(eventDistpacher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)

        eventDistpacher.unregister('ProductCreatedEvent', eventHandler)

        expect(eventDistpacher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
        expect(eventDistpacher.getEventHandlers['ProductCreatedEvent'].length).toBe(0)
    })

    it('should unregister all events', () => {
        const eventDistpacher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDistpacher.register('ProductCreatedEvent', eventHandler)

        expect(eventDistpacher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)

        eventDistpacher.unregisterAll()

        expect(eventDistpacher.getEventHandlers['ProductCreatedEvent']).toBeUndefined()
    })

    it('should notify all event handlers', () => {
        const eventDistpacher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()
        const spyEventHandler = jest.spyOn(eventHandler, 'handle')

        eventDistpacher.register('ProductCreatedEvent', eventHandler)

        expect(eventDistpacher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)

        const productCreatedEvent = new ProductCreatedEvent({
            name: 'Product 1',
            description: 'Product 1 description',
            price: 10.0
        })

        eventDistpacher.notify(productCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled()
    })

}) 