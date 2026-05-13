# Azure AI-200 Lab
Hands-on study repository for the AI-200 Azure AI Cloud Developer Associate certification.

## Structure
- 01-acr — Azure Container Registry
- 02-container-apps — Azure Container Apps
- 03-azure-functions — Azure Functions
- 04-service-bus — Azure Service Bus
- 05-cosmos-db — Cosmos DB
- 06-key-vault — Key Vault & Managed Identity
- 07-opentelemetry — Observability
- 08-azure-openai — Azure OpenAI integration

01-acr/
├── src/
│   └── WeatherApi/          # Simple ASP.NET Core API
├── Dockerfile
├── .dockerignore
├── push-to-acr.sh           # Script to build & push
└── README.md