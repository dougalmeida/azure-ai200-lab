# 02 — Azure Container Apps

Deploys the WeatherApi image (built and pushed in `01-acr`) to Azure Container Apps using a **user-assigned Managed Identity** for ACR authentication — no stored credentials.

## Key Concepts (AI-200)

| Concept | Description |
|---|---|
| **Container Apps Environment** | Shared boundary for apps — networking, logging, Dapr |
| **Container App** | The deployed workload; scales independently |
| **External Ingress** | HTTPS endpoint with auto TLS; routes to `targetPort` |
| **Scale to zero** | `minReplicas: 0` — no cost when idle |
| **Managed Identity** | Replaces registry credentials; AcrPull role on ACR |

## Structure

```
02-container-apps/
├── deploy.sh       # Azure CLI — provision environment + app
├── main.bicep      # Bicep IaC equivalent
└── README.md
```

## Prerequisites

- Resource group and ACR from `01-acr` already exist
- Image `weatherapi:latest` pushed to ACR
- Azure CLI logged in: `az login`

## Deploy

### Option A — CLI script

```bash
# Edit the variables at the top of deploy.sh, then:
bash 02-container-apps/deploy.sh
```

### Option B — Bicep

```bash
az deployment group create \
  --resource-group rg-ai200-lab \
  --template-file 02-container-apps/main.bicep \
  --parameters acrName=<your-acr-name>
```

## What Happens

1. A **Container Apps Environment** is created (shared infrastructure, Log Analytics)
2. A **user-assigned Managed Identity** is created
3. The identity is granted **AcrPull** on the ACR — no passwords stored
4. The **Container App** is deployed pulling the image via the MI
5. An HTTPS FQDN is returned — test it:

```bash
curl https://<fqdn>/cityweather?city=Lisbon
```

## Scale Rules

The app is configured with `minReplicas: 0` (scale to zero when idle) and `maxReplicas: 3`. Container Apps uses HTTP request count to scale by default.
