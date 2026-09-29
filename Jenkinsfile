pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Source code checkout completed'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing Metronome & Tempo Keeper'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t vasanthkumar01/metronome-tempo-keeper:latest .'
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                        docker push vasanthkumar01/metronome-tempo-keeper:latest
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no devops@13.233.214.122 "
                            cd ~/metronome-tempo-keeper &&
                            kubectl apply -f k8s/deployment.yaml &&
                            kubectl apply -f k8s/service.yaml &&
                            kubectl apply -f k8s/ingress.yaml &&
                            kubectl rollout restart deployment/metronome-app &&
                            kubectl rollout status deployment/metronome-app --timeout=120s
                        "
                    '''
                }
            }
        }
    }
}
