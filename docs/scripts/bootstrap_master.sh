#!/usr/bin/env bash
set -euo pipefail

MASTER_PRIVATE_IP="${1:-}"
POD_CIDR="${2:-192.168.0.0/16}"

if [[ -z "$MASTER_PRIVATE_IP" ]]; then
  echo "Usage: $0 <master-private-ip> [pod-cidr]"
  exit 1
fi

sudo kubeadm init \
  --apiserver-advertise-address="$MASTER_PRIVATE_IP" \
  --pod-network-cidr="$POD_CIDR"

mkdir -p "$HOME/.kube"
sudo cp -i /etc/kubernetes/admin.conf "$HOME/.kube/config"
sudo chown "$(id -u):$(id -g)" "$HOME/.kube/config"

kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.28.0/manifests/calico.yaml

kubeadm token create --print-join-command
