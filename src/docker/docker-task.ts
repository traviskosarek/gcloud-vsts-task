import * as taskLib from 'vsts-task-lib';

import { GCPServiceAccountConnection } from './gcp-service-account-connection';
import { DockerTaskActions } from './docker-task-actions';
import { GoogleContainerRegistries } from './google-container-registries';

export class DockerTask {

    private action: string;
    private gcpServiceAccountId: string;
    private gcpServiceAccount: GCPServiceAccountConnection;
    private dockerFilePath: string;
    private googleContainerRegistry: string;
    private gcpProjectId: string;
    private imageName: string;
    private imageTag: string;
    private useLatestTag: boolean;

    public constructor() {
        this.action = taskLib.getInput('gcpDockerActionSelector', true);
        this.googleContainerRegistry = taskLib.getInput('gcpContainerRegistry', true);
        this.gcpProjectId = taskLib.getInput('gcpDockerProjectName', true);
        this.imageName = taskLib.getInput('gcpDockerImageName', true);
        this.imageTag = taskLib.getInput('gcpDockerImageTag', true);
        this.useLatestTag = taskLib.getBoolInput('gcpDockerImageLatestTag', true);
    }

    public run() {
        try {
            switch (this.action) {
                case DockerTaskActions.build:
                    this.dockerFilePath = taskLib.getInput('dockerFilePath', true);

                    let fileTokens = this.dockerFilePath.split('/');
                    let dockerFileName = fileTokens[fileTokens.length - 1];
                    let dockerPath = this.dockerFilePath.replace(dockerFileName, '');

                    console.log('docker file name: ' + dockerFileName);
                    console.log('docker build path: ' + dockerPath);
                    console.log(GoogleContainerRegistries.getRegistry(this.googleContainerRegistry) + '/' + this.gcpProjectId + '/' + this.imageName + ':' + this.imageTag);


                    taskLib.setResult(taskLib.TaskResult.Succeeded, 'Completing \'' + DockerTaskActions.build + '\'');
                    break;
                case DockerTaskActions.push:
                    this.gcpServiceAccountId = taskLib.getInput('serviceAccountAuthentication', false);
                    this.gcpServiceAccount = new GCPServiceAccountConnection(this.gcpServiceAccountId);





                    taskLib.setResult(taskLib.TaskResult.Succeeded, 'Completing \'' + DockerTaskActions.push + '\'');
                    break;
                default:
                    taskLib.setResult(taskLib.TaskResult.Failed, 'Invalid Docker action set: ' + this.action);
                    return;
            }
        }
        catch (e) {
            taskLib.setResult(taskLib.TaskResult.Failed, e);
        }
        finally {
            this.onComplete();
        }
    }

    private dockerBuild() {
        // taskLib.which('gcloud', true);
        // taskLib.which('docker', true);

        // let command = taskLib.tool('gcloud')
        //     .arg('docker')
        //     .arg('--')
        //     .arg('build');
        // command.arg(this.serviceAccountId);
        // command.arg('--key-file=' + this.keyFileName);
        // command.execSync();
    }

    private onComplete() {
        try {
            switch (this.action) {
                case DockerTaskActions.build:
                    break;
                case DockerTaskActions.push:
                    this.gcpServiceAccount.closeConnection();
                    break;
                default:
                    taskLib.setResult(taskLib.TaskResult.Failed, 'Invalid Docker action set: ' + this.action);  
            }    
        }
        catch (e) {
            taskLib.setResult(taskLib.TaskResult.Failed, e);
        }
    }
}

let dockerTask = new DockerTask();
dockerTask.run();
