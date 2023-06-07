import { EventDispatcher } from '../../../../src/domain/event/@shared/event-dispatcher'
import { SendEmailWhenProductIsCreatedHandler } from '../../../../src/domain/event/product/handler/send-email-when-product-is-created.handler'

describe('Domain events tests', () => {

    it('should register an event handler', () => {
        const eventDistpacher = new EventDispatcher()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler()

        eventDistpacher.register('ProductCreatedEvent', eventHandler)

        expect(eventDistpacher.getEventHandlers['ProductCreatedEvent']).toBeDefined()
        expect(eventDistpacher.getEventHandlers['ProductCreatedEvent'].length).toBe(1)
        expect(eventDistpacher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler)
    })

}) 