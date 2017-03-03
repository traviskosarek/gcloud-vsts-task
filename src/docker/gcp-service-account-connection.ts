import * as taskLib from 'vsts-task-lib';

import { GCPServiceAccountConnectionFields } from './gcp-service-account-connection-fields';

export class GCPServiceAccountConnection {

    private _serviceAccountId: string;
    private _keyFileContents: string;
    private _connection: taskLib.EndpointAuthorization;
    private _connectionParameters: { [key: string]: string };
    private _keyFileName: string;

    public serviceAccountId(): string {
        return this._serviceAccountId;
    }

    public keyFileContents(): string {
        return this._keyFileContents;
    }

    public keyFileName(): string {
        return this._keyFileName;
    }

    public constructor(connectionId: string) {
        this._keyFileName = connectionId + '.json';

        this.setConnectionDetails(connectionId);        
    }

    private setConnectionDetails(connectionId: string) {
        if (connectionId) {
            this._connection = taskLib.getEndpointAuthorization(connectionId, true);
            this._connectionParameters = this._connection.parameters;
            if (this._connection) {
                if (this._connectionParameters[GCPServiceAccountConnectionFields.serviceAccountId]) {
                    this._serviceAccountId = this._connectionParameters[GCPServiceAccountConnectionFields.serviceAccountId];
                }
                else {
                    // todo: throw error
                }

                if (this._connectionParameters[GCPServiceAccountConnectionFields.keyFileContents]) {
                    this._keyFileContents = this._connectionParameters[GCPServiceAccountConnectionFields.keyFileContents];
                }
                else {
                    // todo: throw error
                }
            }
            else {
                // todo: throw error
            }
        }
        else {
            // todo: throw error
        }
    }

    public createAuthenticationFile() {
        taskLib.writeFile(this._keyFileName, this.keyFileContents());
        console.log('does file exist: ' + taskLib.exist(this._keyFileName));
    }

    public deleteAuthenticationFile() {
        taskLib.rmRF(this._keyFileName);
    }    
}
