# Live Demo Runbook

## 1) Show cluster health

```bash
kubectl get nodes
kubectl get pods -A
```

## 2) Deploy/verify app

```bash
kubectl apply -k k8s/base
kubectl -n paylabs get all
kubectl -n paylabs get ingress
```

## 3) Functional test

From browser:

- Open `http://<INGRESS_IP>/`
- Refresh several times and verify counter increments (via backend/redis).

CLI check:

```bash
curl -s http://<INGRESS_IP>/api/message
curl -s http://<INGRESS_IP>/api/message
```

## 4) Security validation snippets

```bash
kubectl -n paylabs get pod <backend-pod> -o jsonpath='{.spec.containers[0].securityContext}'
kubectl -n paylabs top pods
```

## 5) CI/CD demonstration

- Push to `main`
- Show GitHub Actions pipeline stages:
  1. test-and-scan
  2. build-and-push
  3. deploy
- Show updated image tag in deployment:

```bash
kubectl -n paylabs get deploy backend -o jsonpath='{.spec.template.spec.containers[0].image}'
```
