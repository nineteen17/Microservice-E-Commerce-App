provider "aws" {
  region = "ap-southeast-2"
}

provider "kubernetes" {
  # Configuration for your Kubernetes cluster
  # This can be omitted if you're using kubeconfig file
  # Kubernetes provider will use the default kubeconfig file at ~/.kube/config
}
