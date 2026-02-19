pipeline {
    agent any

    stages {

        stage('Build Images') {
            steps {
                sh 'docker build -t backend:latest ./backend'
                sh 'docker build -t frontend:latest ./frontend'
                sh 'docker build -t nginx-local:latest ./nginx'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -R -f k8s/'
            }
        }

        stage('Restart Deployments') {
            steps {
                sh 'kubectl rollout restart deployment backend -n my-app'
                sh 'kubectl rollout restart deployment frontend -n my-app'
                sh 'kubectl rollout restart deployment nginx -n my-app'
            }
        }

        stage('Check Pods') {
            steps {
                sh 'kubectl get pods -n my-app'
            }
        }
    }
}