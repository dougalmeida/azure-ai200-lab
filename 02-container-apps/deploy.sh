#!/usr/bin/env bash
set -euo pipefail

# --- Edit these ---
RG="rg-ai200-lab"
LOCATION="eastus"
ACR_NAME="<your-acr-name>"
IMAGE_TAG="latest"
ENVIRONMENT="env-ai200"
APP_NAME="weatherapi"
# ------------------

IMAGE="$ACR_NAME.azurecr.io/weatherapi:$IMAGE_TAG"

echo "==> Creating Container Apps environment..."
az containerapp env create \
  --name "$ENVIRONMENT" \
  --resource-group "$RG" \
  --location "$LOCATION"

echo "==> Creating user-assigned managed identity..."
az identity create \
  --name "id-$APP_NAME" \
  --resource-group "$RG" \
  --location "$LOCATION"

MI_PRINCIPAL=$(az identity show --name "id-$APP_NAME" --resource-group "$RG" --query principalId -o tsv)
MI_ID=$(az identity show --name "id-$APP_NAME" --resource-group "$RG" --query id -o tsv)

echo "==> Granting AcrPull to managed identity..."
ACR_ID=$(az acr show --name "$ACR_NAME" --resource-group "$RG" --query id -o tsv)
az role assignment create \
  --assignee "$MI_PRINCIPAL" \
  --role AcrPull \
  --scope "$ACR_ID"

echo "==> Deploying container app..."
az containerapp create \
  --name "$APP_NAME" \
  --resource-group "$RG" \
  --environment "$ENVIRONMENT" \
  --image "$IMAGE" \
  --target-port 8080 \
  --ingress external \
  --min-replicas 0 \
  --max-replicas 3 \
  --cpu 0.25 \
  --memory 0.5Gi \
  --user-assigned "$MI_ID" \
  --registry-server "$ACR_NAME.azurecr.io" \
  --registry-identity "$MI_ID"

echo ""
echo "==> App URL:"
az containerapp show \
  --name "$APP_NAME" \
  --resource-group "$RG" \
  --query properties.configuration.ingress.fqdn -o tsv | xargs -I{} echo "https://{}"
