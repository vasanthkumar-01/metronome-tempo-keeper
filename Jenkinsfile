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

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no devops@13.233.214.122 "
                            docker pull vasanthkumar01/metronome-tempo-keeper:latest &&
                            docker rm -f metronome-app || true &&
                            docker run -d --name metronome-app -p 80:80 vasanthkumar01/metronome-tempo-keeper:latest
                        "
                    '''
                }
            }
        }
    }
}
