import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { EventInterface } from "../../@shared/event.interface";

export class EnviaConsoleLogHandler implements EventHandlerInterface {
    handle (event: EventInterface): void {
        const { eventData } = event
        const { id, name, address } = eventData

        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address.toString()}`)
    }

}