# Microservice E-Commerce App

This is a microservices-based e-commerce application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application is designed to be scalable and modular, with each service handling a specific aspect of the e-commerce platform.

## Features

- User authentication and authorization. (JWT Auth and Refresh Tokens)
- Product listing and search
- Shopping cart and order management
- Payment processing with Stripe
- Event-driven communication using RabbitMQ

## Architecture

The application is divided into several microservices:

- `user-service`: Handles user authentication and authorization.
- `product-service`: Manages product listings and search functionality.
- `order-service`: Handles shopping cart and order management. Integrates with Stripe for payment processing.

Communication between services is facilitated by RabbitMQ, ensuring a decoupled and scalable architecture.

## Technologies

- **Frontend**: React.js, Tailwind CSS, Tanstack Query, Zustand
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (hosted on Atlas)
- **Messaging**: RabbitMQ
- **Containerization**: Docker
- **Orchestration**: Kubernetes (Rancher Desktop for local development)
- **Ingress**: Nginx (installed using Helm)
- **Infrastructure**: Terraform
- **Language**: Typescript

## Getting Started

### Prerequisites

- Node.js and npm
- WSL (recommended)
- Docker Desktop (Kubernetes cluster for local development)
- Helm (for Nginx installation)
- Skaffold (Automatically builds docker images and deploys to k8s cluster)
- Terraform (to create an s3 bucket to store images)
- Atlas account (hosted database)
- Stripe account (payments)
