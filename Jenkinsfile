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
               echo 'Testing Metronome & Tempo Keeper v2'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Docker build stage'
            }
        }
    }
}

