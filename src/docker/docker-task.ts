import * as taskLib from 'vsts-task-lib';

import { GCPServiceAccountConnection } from '../gcp-service-account/gcp-service-account-connection';
import { GoogleContainerRegistries } from '../container/google-container-registries';
import { DockerTaskActions } from './docker-task-actions';

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
    private dockerImageName: string;

    public constructor() {
        this.action = taskLib.getInput('gcpDockerActionSelector', true);
        this.googleContainerRegistry = taskLib.getInput('gcpContainerRegistry', true);
        this.gcpProjectId = taskLib.getInput('gcpDockerProjectId', true);
        this.imageName = taskLib.getInput('gcpDockerImageName', true);
        this.dockerImageName = GoogleContainerRegistries.getRegistry(this.googleContainerRegistry) + '/' + this.gcpProjectId + '/' + this.imageName;
        this.imageTag = taskLib.getInput('gcpDockerImageTag', true);
        this.useLatestTag = taskLib.getBoolInput('gcpDockerImageLatestTag', true);
    }

    public run() {
        try {
            // ensure that gcloud and docker exist prior to trying to build
            taskLib.which('gcloud', true);
            taskLib.which('docker', true);

            switch (this.action) {
                case DockerTaskActions.build:
                    this.dockerFilePath = taskLib.getInput('dockerFilePath', true);

                    this.dockerBuild();

                    taskLib.setResult(taskLib.TaskResult.Succeeded, 'Completing \'' + DockerTaskActions.build + '\'');
                    break;
                case DockerTaskActions.push:
                    this.gcpServiceAccountId = taskLib.getInput('serviceAccountAuthentication', false);
                    this.gcpServiceAccount = new GCPServiceAccountConnection(this.gcpServiceAccountId);

                    this.dockerPush();

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
        let fileTokens = this.dockerFilePath.split('/');
        let dockerFileName = fileTokens[fileTokens.length - 1];
        let dockerPath = this.dockerFilePath.replace(dockerFileName, '');
        
        taskLib.tool('gcloud')
            .arg('docker')
            .arg('--')
            .arg('build')
            .arg(dockerPath)
            .arg('--file')
            .arg(dockerFileName)
            .argIf(!this.imageTag && !this.useLatestTag, '--tag')
            .argIf(!this.imageTag && !this.useLatestTag, this.dockerImageName)
            .argIf(this.imageTag, '--tag')
            .argIf(this.imageTag, this.dockerImageName + ':' + this.imageTag)
            .argIf(this.useLatestTag, '--tag')
            .argIf(this.useLatestTag, this.dockerImageName + ':latest')
            .exec();
    }

    private dockerPush() {
        if (!this.imageTag && !this.useLatestTag) {
            taskLib.tool('gcloud')
                .arg('docker')
                .arg('--')
                .arg('push')
                .arg(this.dockerImageName)
                .exec();
        }

        if (this.imageTag) {
            taskLib.tool('gcloud')
                .arg('docker')
                .arg('--')
                .arg('push')
                .arg(this.dockerImageName + ':' + this.imageTag)
                .exec();
        }

        if (this.useLatestTag) {
            taskLib.tool('gcloud')
                .arg('docker')
                .arg('--')
                .arg('push')
                .arg(this.dockerImageName + ':latest')
                .exec();
        }
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
