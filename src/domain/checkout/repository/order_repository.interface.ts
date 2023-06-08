import { Order } from "../entity/order";
import { RepositoryInterface } from "../../@shared/repository/repository_interface";

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}