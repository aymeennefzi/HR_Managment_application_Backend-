    pipeline {
        agent any

        stages {
            stage("Checkout Git repository") {
                steps {
                    echo 'Pulling ';
                    git branch: 'master', url: 'https://github.com/aymeennefzi/HR_Managment_application_Backend-.git' ;
                }
                post {
                    success {
                        echo "Cloning successful..."
                    }
                    failure {
                        echo "Cloning failed! See log for details. Terminating..."
                    }
                }
            }

        }
    }
