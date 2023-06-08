import { EventHandlerInterface } from "../../../@shared/event/event-handler.interface";
import { EventInterface } from "../../../@shared/event/event.interface";
import { ChangeAddressEvent } from "../change-address.event";

export class EnviaConsoleLogHandler implements EventHandlerInterface<ChangeAddressEvent> {
    handle (event: EventInterface): void {
        const { eventData } = event
        const { id, name, address } = eventData

        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address.toString()}`)
    }

}