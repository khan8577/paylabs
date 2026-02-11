# Phase 1 – EC2 Kubernetes Cluster Setup (AWS)

## 1) Provision EC2 Instances

Create two Ubuntu 22.04 EC2 instances:

- **Master node**: 2 vCPU, 4 GB RAM
- **Worker node**: 2 vCPU, 4 GB RAM

Recommended instance type: `t3.medium`.

## 2) AWS Networking and Security Best Practices

- Put both nodes in the same VPC/subnet.
- Attach an IAM role with least privilege (CloudWatch logging optional).
- Use security groups with least-open ports.

### Master node security group inbound

- TCP 22 from your admin IP
- TCP 6443 from worker SG
- TCP 2379-2380 from master SG (etcd)
- TCP 10250 from master/worker SG
- TCP 10257, 10259 from master SG
- NodePort range TCP 30000-32767 from trusted CIDR (optional)

### Worker node security group inbound

- TCP 22 from your admin IP
- TCP 10250 from master SG
- TCP 30000-32767 from trusted CIDR or LB SG (if NodePort fallback needed)

### For Ingress exposure

- Expose TCP 80 and 443 on worker nodes (or all nodes if controller schedules anywhere).

## 3) Node Preparation

Run on **both** nodes:

```bash
bash docs/scripts/install_k8s_node.sh
```

## 4) Initialize Control Plane

Run on **master**:

```bash
bash docs/scripts/bootstrap_master.sh <MASTER_PRIVATE_IP>
```

Save the emitted `kubeadm join ...` command.

## 5) Join Worker

Run the saved join command on **worker**:

```bash
sudo kubeadm join <MASTER_PRIVATE_IP>:6443 --token <token> --discovery-token-ca-cert-hash sha256:<hash>
```

## 6) Validation

On master:

```bash
kubectl get nodes -o wide
kubectl get pods -A
```

Expected: master and worker both `Ready`.
