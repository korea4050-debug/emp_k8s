
stage('Docker Diagnose') {
  steps {
    sh '''
      set +e
      docker version
      docker info
      docker compose version
      docker-compose version
      which docker
      ls -al /usr/libexec/docker/cli-plugins 2>/dev/null || true
      ls -al /usr/local/lib/docker/cli-plugins 2>/dev/null || true
    '''
  }
}


pipeline {
    agent any

    stages {

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t backend:latest ./backend'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }

        stage('Check Pods') {
            steps {
                sh 'kubectl get pods -n my-app'
            }
        }
    }
}