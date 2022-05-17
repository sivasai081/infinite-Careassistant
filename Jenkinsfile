#!groovy
pipeline { 
    environment { 
        registry = "https://healthlligence.azurecr.io" 
        registryCredential = 'acrauth' 
    }
    agent any 
    stages { 
        stage('Cloning our Git') { 
            steps { 
                git branch: 'SqlCareassistantWebMDB',
                    credentialsId: 'careassistantgit',
                    url: 'https://healthlligencemvp@dev.azure.com/healthlligencemvp/careassistant.ai/_git/careassistant.ai'  
                
                contentReplace(configs: [fileContentReplaceConfig(configs: [fileContentReplaceItemConfig(matchCount: 0, replace: 'API_BASEURL=http://192.168.1.109:8090/', search: '^API_BASEURL.*')], fileEncoding: 'UTF-8', filePath: './.env')])          
            }
        } 
        stage('Building our image') { 
            steps { 
                script { 
                    app = docker.build("healthlligence/careassistant-ai-sql","--network host ./")
                }
            } 
        }
        stage('Deploy Image') { 
            steps { 
                script { 
                    docker.withRegistry(registry, registryCredential) {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                } 
            }
        } 
        stage('Deploy Container') {
            steps { 
                script {         
                       docker.withRegistry(registry, registryCredential) {
                            try {
                                sh "docker stop \$(docker ps -q --filter name=careassistant-sql)"
                                sh "docker rm \$(docker ps -a -q --filter name=careassistant-sql)"
                            } catch(Exception e) {
                                currentBuild.result = 'SUCCESS'
                            }
                            sh "docker pull healthlligence.azurecr.io/healthlligence/careassistant-ai-sql:latest"
                            sh "docker run --name careassistant-sql -d -p 3010:3000 healthlligence.azurecr.io/healthlligence/careassistant-ai-sql:latest"
                            sh "docker image prune -a -f"
                        }
                } 
            }            
        }
    }
    post {
        success {
          mail to: 'kumar@healthlligence.com,poornima@healthlligence.com, eugene@healthlligence.com, david@healthlligence.com, sivasai.mantena@infinite.com, akash@healthlligence.com',
          subject: "${BUILD_TAG} : ${currentBuild.currentResult}",
          body: "result: ${currentBuild.currentResult}"            
        }
        failure {
          mail to: 'kumar@healthlligence.com,poornima@healthlligence.com, eugene@healthlligence.com, david@healthlligence.com, sivasai.mantena@infinite.com, akash@healthlligence.com',
          subject: "${BUILD_TAG} : ${currentBuild.currentResult}",
          body: "Something went wrong, please check log for error details." 
        }
    }
}