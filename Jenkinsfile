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
                sh 'docker build -t vasanthkumar01/metronome-tempo-keepe:latest .'
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
                        docker push vasanthkumar01/metronome-tempo-keepe:latest
                        docker logout
                    '''
                }
            }
        }
    }
}
