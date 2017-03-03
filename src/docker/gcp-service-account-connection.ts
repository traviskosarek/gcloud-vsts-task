import * as taskLib from 'vsts-task-lib/task';

import { GCPServiceAccountConnectionFields } from './gcp-service-account-connection-fields';

export class GCPServiceAccountConnection {

    private _serviceAccountId: string;
    private _keyFileContents: string;
    private _connection: taskLib.EndpointAuthorization;
    private _connectionParameters: { [key: string]: string };

    public serviceAccountId(): string {
        return this._serviceAccountId;
    }

    public keyFileContents(): string {
        return this._keyFileContents;
    }

    public constructor(connectionId: string) {
        this.setConnectionDetails(connectionId);        
    }

    private setConnectionDetails(connectionId: string) {
        if (connectionId) {
            console.log('***** ' + connectionId);
            this._connection = taskLib.getEndpointAuthorization(connectionId, true);
            console.log('***** ' + JSON.stringify(this._connection));
            this._connectionParameters = this._connection.parameters;
            console.log('***** ' + JSON.stringify(this._connectionParameters));
            if (this._connection) {
                if (this._connection[GCPServiceAccountConnectionFields.serviceAccountId]) {
                    this._serviceAccountId = this._connection[GCPServiceAccountConnectionFields.serviceAccountId];
                }
                else {
                    // todo: throw error
                }

                if (this._connection[GCPServiceAccountConnectionFields.keyFileContents]) {
                    this._keyFileContents = this._connection[GCPServiceAccountConnectionFields.keyFileContents];
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
        // todo
    }

    public deleteAuthenticationFile() {
        // todo
    }    
}
