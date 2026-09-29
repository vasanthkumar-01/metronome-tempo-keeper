
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
                sh 'docker build -t metronome-tempo-keeper:latest .'
            }
        }
    }
}
