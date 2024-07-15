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

<!-- Installing Nginx Ingress Controller using helm -->
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace


<!-- OPTIONAL: Install Argocd CLI -->
curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
rm argocd-linux-amd64

<!-- Configure Argocd amd add tp the cluster -->
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
<!-- Deploy the apllication to argocd -->
- cd into the argocd folder location
kubectl apply -f argocd-application.yaml
kubectl apply -f argocd-server-loadbalancer.yaml
<!-- Expose Argo CD API Server: -->
kubectl port-forward svc/argocd-server -n argocd 8080:443
<!-- Log in to Argo CD: -->
argocd login localhost:8080
<!-- Go to localhost -->
127.0.0.1:8080
<!-- Get admin password -->
- username = admin
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo

<!-- Verify that the Argo CD application has been created and is syncing correctly. -->
argocd app get microservice-e-commerce-app
<!-- Sync the application -->
argocd app sync microservice-e-commerce-app

<!-- Create a namespace for docker secrets -->
kubectl create namespace beer-and-more-dev

<!-- Create a docker secret -->
kubectl create secret docker-registry docker-registry-secret \
  --docker-server=https://index.docker.io/v1/ \
  --docker-username=<your-docker-hub-username> \
  --docker-password=<your-docker-hub-password> \
  --docker-email=<your-docker-hub-email> \
  --namespace=default
<!-- Ensure that the service account in your namespace uses this secret for pulling images. -->
kubectl patch serviceaccount default \
  -p '{"imagePullSecrets": [{"name": "docker-registry-secret"}]}'

<!-- create external secrets. NOTE use external_secrets_role_arn from outputs.tf -->
helm repo add external-secrets https://charts.external-secrets.io
helm repo update

helm install external-secrets external-secrets/external-secrets \
  --set serviceAccount.create=true \
  --set serviceAccount.annotations."eks\.amazonaws\.com/role-arn"=<arn:aws:iam::123456789012:role/external-secrets-role>

<!-- Build and push the docker images to the registry -->
skaffold run
<!-- Destroy EKS Cluster and VPC -->
manually delete the load balancer in the aws cli or console
terraform plan -destroy -target=module.eks -target=module.vpc -out=tfplan
terraform apply "tfplan" b 
