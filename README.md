# RabbitMQ Typescript

Experimenting messaging queue with RabbitMQ

1. install all dependencies
```shell
make i
```

2. husky
```shell
make h
```

3. init the rabbitMQ container
```shell
make rmq
```

## rabbitMQ commands
1. [List queues and messages] inside the rabbitmq container:
```shell
rabbitmqctl list_queues
```