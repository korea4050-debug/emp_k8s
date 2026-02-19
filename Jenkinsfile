pipeline {
  agent any

  environment {
    APP_NAME   = "emp-k8s"
    NAMESPACE  = "default"
    REGISTRY   = "docker.io"                 // 예: docker.io 또는 ghcr.io
    IMAGE_REPO = "korea4050debug/emp_k8s"     // 예: docker hub repo
    IMAGE_TAG  = "${BUILD_NUMBER}"           // 또는 GIT_COMMIT.take(7)
    IMAGE      = "${REGISTRY}/${IMAGE_REPO}:${IMAGE_TAG}"
  }

  stages {
    stage("Checkout") {
      steps {
        checkout scm
        sh 'git rev-parse --short HEAD'
      }
    }

    stage("Build Docker Image") {
      steps {
        sh """
          set -e
          echo "Build: ${IMAGE}"
          docker build -t ${IMAGE} .
        """
      }
    }

    stage("Push Image") {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DH_USER', passwordVariable: 'DH_PASS')]) {
          sh """
            set -e
            echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin ${REGISTRY}
            docker push ${IMAGE}
          """
        }
      }
    }

    stage("Deploy to Kubernetes") {
      steps {
        withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_FILE')]) {
          sh """
            set -e
            export KUBECONFIG=$KUBECONFIG_FILE

            kubectl version --client
            kubectl get nodes

            # (방법 1) 매니페스트 apply
            kubectl apply -n ${NAMESPACE} -f k8s/

            # 이미지 태그만 새로 바꾸기(권장)
            kubectl set image -n ${NAMESPACE} deployment/${APP_NAME} ${APP_NAME}=${IMAGE}

            # 배포 상태 확인
            kubectl rollout status -n ${NAMESPACE} deployment/${APP_NAME}
            kubectl get pods -n ${NAMESPACE} -o wide
          """
        }
      }
    }
  }

  post {
    success { echo "✅ K8s Deploy Success" }
    failure { echo "❌ K8s Deploy Failed" }
  }
}
