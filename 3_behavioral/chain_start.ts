abstract class AbstractHandler<T> {
  private nextHandler: AbstractHandler<T>;

  next(handler: AbstractHandler<T>): AbstractHandler<T> {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: T): T {
    return this.nextHandler ? this.nextHandler.handle(request) : null;
  }
}

enum Status {
  Received,
  Pending,
  InProcess,
  Sent,
  Delivered,
}
enum Priority {
  Low,
  Medium,
  High,
  Urgent,
}

interface Order {
  id: number;
  itemCount: number;
  ordered: string;
  expectedDelivery: string;
  status: Status;
  priority: Priority;
}

const orders: Order[] = [
  {
    id: 1,
    itemCount: 3,
    ordered: '08/12/2020',
    expectedDelivery: '9/15/2020',
    status: Status.Pending,
    priority: Priority.Low,
  },
  {
    id: 2,
    itemCount: 15,
    ordered: '06/10/2020',
    expectedDelivery: '8/15/2020',
    status: Status.Pending,
    priority: Priority.High,
  },
  {
    id: 3,
    itemCount: 1,
    ordered: '08/12/2020',
    expectedDelivery: '9/15/2020',
    status: Status.Sent,
    priority: Priority.Low,
  },
];

class OrderManager {
  private readonly orders: Order[];

  constructor(orders: Order[]) {
    this.orders = orders;
  }

  process(handler: AbstractHandler<Order>) {
    for (const order of this.orders) {
      handler.handle(order);
    }
  }
}

class ValidateId extends AbstractHandler<Order> {
  handle(order: Order): Order {
    if (order.id < 2) {
      console.log('invalid order id');
      return null;
    }

    return super.handle(order);
  }
}

class StatusCheck extends AbstractHandler<Order> {
  handle(order: Order): Order {
    if (order.status === Status.Received) {
      console.log('Order received');
      return null;
    }

    return super.handle(order);
  }
}

class PriorityAlert extends AbstractHandler<Order> {
  handle(order: Order): Order {
    if (order.priority === Priority.Urgent) {
      console.log('Send to urgent queue');
      return null;
    }

    return super.handle(order);
  }
}

// direct usage
const orderIdValidator = new ValidateId();
const statusCheck = new StatusCheck();
const priorityValidator = new PriorityAlert();

/**
 *  todo: each order need be process in the following order:
 *   - validate: if the order id is valid. if not, no need to check status
 *   - check status: if received, move to done - no need to check priority
 *   - check priority: if urgent, send to a urgent queue and return
 */

// Product
// Linked list
// base-flow: validateId -> status -> priority
const basicFlow = orderIdValidator.next(statusCheck).next(priorityValidator);

// full-path: validateId -> expectedDelivery -> priority -> status
const extendedValidator = basicFlow.next(orderIdValidator);

const abTesting = true ? basicFlow : extendedValidator;

if (false) {
  abTesting.next(basicFlow);
}

const orderManager = new OrderManager(orders);
orderManager.process(extendedValidator);
