# Phase 4 – NGINX Ingress Setup

## Install controller

On control plane node:

```bash
bash docs/scripts/install_ingress.sh
```

## Verify

```bash
kubectl get pods -n ingress-nginx
kubectl get svc -n ingress-nginx
```

## Deploy app ingress

```bash
kubectl apply -k k8s/base
kubectl get ingress -n paylabs
```

## Routing

- `/` → `frontend` service
- `/api` → `backend` service

Point DNS (or `/etc/hosts`) to the Ingress external IP and browse:

```text
http://<INGRESS_IP>/
```
