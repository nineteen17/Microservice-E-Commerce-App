<!-- Terraform -->
- cd into folder
- terraform init
- terraform validate
- terraform plan
- terraform apply
- terraform output

<!-- Update your kubeconfig file to use your EKS cluster -->
aws eks --region <your-region> update-kubeconfig --name <your-cluster-name>
kubectl config current-context

<!-- Configure Argocd amd add tp the cluster -->
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
<!-- Expose Argo CD API Server: -->
kubectl port-forward svc/argocd-server -n argocd 8080:443
<!-- Log in to Argo CD: -->
argocd login localhost:8080
<!-- Go to localhost -->
127.0.0.1:8080
<!-- Get admin password -->
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
username = admin


<!-- Installing Nginx Ingress Controller using helm -->
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace


<!-- Install Argocd CLI -->
curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
rm argocd-linux-amd64

<!-- Deploy the apllication to argocd -->
cd into the argocd folder location
kubectl apply -f argocd-application.yaml
kubectl apply -f argocd-server-loadbalancer.yaml

<!-- Verify that the Argo CD application has been created and is syncing correctly. -->
argocd app get microservice-e-commerce-app
<!-- Sync the application -->
argocd app sync microservice-e-commerce-app
