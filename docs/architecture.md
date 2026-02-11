# Architecture Overview

## Components

- **Frontend**: React single-page app served by unprivileged NGINX.
- **Backend**: Express API with `/api/message` and `/healthz`.
- **Redis**: Caching + visit counter state.

## Kubernetes Topology

- Namespace: `paylabs`
- Deployments: frontend (2 replicas), backend (2 replicas), redis (1 replica)
- Services: ClusterIP for each app
- Ingress: NGINX path-based routing
- Config: ConfigMap for non-sensitive env, Secret for Redis URL

## Security Controls

- Non-root containers
- Pod/container `securityContext` hardening
- Dropped Linux capabilities
- Resource requests/limits on each workload
- Readiness/liveness probes
- Secrets handled through Kubernetes Secret and GitHub Secrets
