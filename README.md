# PAYLABS DevOps Take-Home Solution

This repository provides a full end-to-end DevOps implementation for a three-tier application (`frontend`, `backend`, `redis`) on AWS EC2-backed Kubernetes.

## Repository Structure

```text
project/
  frontend/
  backend/
  redis/
  k8s/
  .github/workflows/
  docs/
  README.md
```

> In this repository, `project/` is represented by the repository root.

## Tech Stack

- **Linux**: Ubuntu 22.04 LTS (EC2)
- **Containers**: Docker-compatible images built with Dockerfiles
- **Orchestration**: Kubernetes via kubeadm
- **Ingress**: NGINX Ingress Controller
- **CI/CD**: GitHub Actions
- **Security scanning**: SonarQube + Trivy

## Quick Start

1. Provision EC2 instances (master + worker) using the guide in `docs/ec2-k8s-setup.md`.
2. Bootstrap Kubernetes cluster using scripts from `docs/scripts/`.
3. Build/push images via GitHub Actions (on push to `main`).
4. Deploy to cluster using `kubectl apply -k k8s/base`.
5. Access app through Ingress public endpoint.

## Local Validation Commands

```bash
# Backend unit/integration tests (requires Redis)
cd backend && REDIS_URL=redis://127.0.0.1:6379 npm test

# Frontend production build
cd frontend && npm run build

# Kubernetes manifest validation (cluster context required)
kubectl apply --dry-run=client -k k8s/base
```

## Deliverables Mapping

- **Phase 1 (EC2 cluster setup)**: `docs/ec2-k8s-setup.md`, `docs/scripts/*`
- **Phase 2 (containerization)**: `frontend/Dockerfile`, `backend/Dockerfile`, `redis/Dockerfile`, service `.dockerignore`
- **Phase 3 (Kubernetes deployment)**: `k8s/base/*`
- **Phase 4 (Ingress setup)**: `docs/ingress.md`, `k8s/base/ingress.yaml`
- **Phase 5 (CI/CD)**: `.github/workflows/ci-cd.yaml`, `sonar-project.properties`
- **Phase 6 (security best practices)**: Dockerfiles + Kubernetes `securityContext` + probes + secrets/config

## Live Demo Instructions

See `docs/live-demo.md` for a scripted walkthrough.
