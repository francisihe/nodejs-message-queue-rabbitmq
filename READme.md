# Order, Inventory & Notifications Microservices Test Repo with RabbitMQ and PostgreSQL

This implements a microservices architecture using Node.js (TypeScript), RabbitMQ (for messaging), and PostgreSQL (for data storage). The system consists of the following services:

Order Service → Handles order placement and sends messages to RabbitMQ.
Inventory Service → Listens for order messages and updates stock.
Notification Service → Listens for inventory updates and sends notifications.

Each service is containerized with Docker and communicates asynchronously via RabbitMQ.