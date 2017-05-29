export interface Credentials {
    client_email: string;
    private_key: string;
}

export interface APIConfig {
    projectId?: string;
    keyFilename?: string;
    credentials?: Credentials;
}
