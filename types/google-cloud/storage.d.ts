import { APIConfig, Credentials } from './common';

interface APIReponse { }

declare namespace ACL {
    interface ACLOpts {
        enity: string;
    }

    interface ACLSetOpts extends ACLOpts {
        role: string;
    }

    interface ACLObject { }

    interface ACLConvenienceMethods {
        addAllAuthenticatedUsers(): Promise<[ACLObject, APIReponse]>;
        addAllAuthenticatedUsers(cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;
        deleteAllAuthenticatedUsers(): Promise<[ACLObject, APIReponse]>;
        deleteAllAuthenticatedUsers(cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;
        addAllUsers(): Promise<[ACLObject, APIReponse]>;
        addAllUsers(cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;
        deleteUsers(): Promise<[ACLObject, APIReponse]>;
        deleteUsers(cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;
        addDomain(): Promise<[ACLObject, APIReponse]>;
        addDomain(domain: string, cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;
        deleteDomain(): Promise<[ACLObject, APIReponse]>;
        deleteDomain(domain: string, cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;
        addGroup(): Promise<[ACLObject, APIReponse]>;
        addGroup(group: string, cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;
        deleteGroup(): Promise<[ACLObject, APIReponse]>;
        deleteGroup(group: string, cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;
        addProject(): Promise<[ACLObject, APIReponse]>;
        addProject(project: string, cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;
        deleteProject(): Promise<[ACLObject, APIReponse]>
        deleteProject(project: string, cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;
        addUser(): Promise<[ACLObject, APIReponse]>;
        addUser(user: string, cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;
        deleteUser(): Promise<[ACLObject, APIReponse]>;
        deleteUser(user: string, cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;
    }

    interface ACL {
        /**
         * Add access controls on a storage/bucket or storage/file.
         */
        add(opts: ACLSetOpts): Promise<[ACLObject, APIReponse]>;
        add(opts: ACLSetOpts, cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;

        /**
         * Delete access controls on a storage/bucket or storage/file.
         */
        delete(opts?: ACLOpts): Promise<[APIReponse]>;
        delete(cb: (err: Error, apiResponse: APIReponse) => void): void;
        delete(opts: ACLOpts, cb: (err: Error, apiResponse: APIReponse) => void): void;

        /**
         * Get access controls on a storage/bucket or storage/file. If an entity is omitted, you will receive an array of all applicable access controls.
         */
        get(opts?: ACLOpts): Promise<[ACLObject, APIReponse]>;
        get(cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;
        get(opts: ACLOpts, cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;

        /**
         * An object of convenience methods to add or delete owner ACL permissions for a given entity.
         */
        owners: ACLConvenienceMethods;

        /**
         * An object of convenience methods to add or delete reader ACL permissions for a given entity.
         */
        readers: ACLConvenienceMethods;

        /**
         * Update access controls on a storage/bucket or storage/file.
         */
        update(opts?: ACLSetOpts): Promise<[ACLObject, APIReponse]>;
        update(cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;
        update(opts: ACLSetOpts, cb: (err: Error, aclObject: ACLObject, apiResponse: APIReponse) => void): void;

        /**
         * An object of convenience methods to add or delete writer ACL permissions for a given entity.
         */
        writers: ACLConvenienceMethods;
    }
}

declare namespace Bucket {
    namespace ACL {
        interface ACL {
            /**
             * Cloud Storage Buckets have default ACLs for all created files. You can add, delete, get, and update entities and permissions for these as well. The method signatures and examples are all the same, after only prefixing the method call with default.
             */
            default: ACL;
        }
    }

    interface CreateBucketOpts extends Credentials {
        bucketName: string;
    }

    interface CreateChannelOpts {
        address: string;
    }

    interface FileQuery {
        autoPaginate?: boolean;
        delimiter?: string;
        prefix?: string;
        maxApiCalls?: number;
        maxResults?: number;
        pageToken?: string;
        versions?: boolean;
    }

    interface DeleteFileQuery extends FileQuery {
        force?: boolean;
    }

    type HTTPMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';

    interface BucketMetadata {
        cors: Array<{
            maxAgeSeconds?: number;
            method?: Array<HTTPMethods | '*'>;
            origin?: string[];
            responseHeader?: string[];
        }>;
        defaultObjectAcl: any[]; // TODO:
        labels?: {
            [key: string]: string;
        }
        lifecycle?: any; // TODO:
        logging?: {
            logBucket?: string;
            logObjectPrefix?: string;
        }
        versioning?: {
            enabled?: boolean;
        }
        website?: {
            mainPageSuffix?: string;
            notFoundPage?: string;
        }
    }

    interface Bucket {
        /**
         * Cloud Storage uses access control lists (ACLs) to manage object and bucket access. ACLs are the mechanism you use to share objects with other users and allow other users to access your buckets and objects.

         * An ACL consists of one or more entries, where each entry grants permissions to an entity. Permissions define the actions that can be performed against an object or bucket (for example, READ or WRITE); the entity defines who the permission applies to (for example, a specific user or group of users).

         * The acl object on a Bucket instance provides methods to get you a list of the ACLs defined on your bucket, as well as set, update, and delete them.

         * Buckets also have default ACLs for all created files. Default ACLs specify permissions that all new objects added to the bucket will inherit by default. You can add, delete, get, and update entities and permissions for these as well with storage/bucket#acl.default.
         */
        acl: ACL.ACL;

        /**
         * Combine multiple files into one new file.
         */
        combine(sources: Array<string | File.File>, destination: string | File.File): Promise<[File.File, APIReponse]>;
        combine(sources: Array<string | File.File>, destination: string | File.File, cb: (err: Error, newFile: File.File, apiResponse: APIReponse) => void): void;

        /**
         * Create a bucket.
         * TODO: Optional config object as first argument
         */
        create(): Promise<[Bucket, APIReponse]>;
        create(cb: (err: Error, zone: Bucket, apiReponse: APIReponse) => void): void;

        /**
         * Create a channel that will be notified when objects in this bucket changes.
         */
        createChannel(id: string, config: CreateChannelOpts): Promise<[Channel.Channel, APIReponse]>;
        createChannel(id: string, config: CreateChannelOpts, cb: (err: Error, channel: Channel.Channel, apiResponse: APIReponse) => void): void;

        /**
         * Delete the bucket.
         */
        delete(): Promise<[APIReponse]>;
        delete(cb: (err: Error, apiResponse: APIReponse) => void): void;

        /**
         * Iterate over the bucket's files, calling file.delete() on each.
         *
         * This is not an atomic request. A delete attempt will be made for each file individually. Any one can fail, in which case only a portion of the files you intended to be deleted would have.
         *
         * Operations are performed in parallel, up to 10 at once. The first error breaks the loop and will execute the provided callback with it. Specify { force: true } to suppress the errors until all files have had a chance to be processed.
         *
         * The query object passed as the first argument will also be passed to storage/bucket#getFiles.
         */
        deleteFiles(query?: DeleteFileQuery): Promise<[void]>;
        deleteFiles(cb: (err: Error | Error[]) => void): void;
        deleteFiles(query: DeleteFileQuery, cb: (err: Error | Error[]) => void): void;

        /**
         * Check if the bucket exists.
         */
        exists(): Promise<[boolean]>;
        exists(cb: (err: Error, exists: boolean) => void): void;

        /**
         * Create a File object. See storage/file to see how to handle the different use cases you may have.
         */
        file(name: string, opts?: File.FileOpts): File.File;

        /**
         * Get a bucket if it exists.
         *
         * You may optionally use this to "get or create" an object by providing an object with autoCreate set to true. Any extra configuration that is normally required for the create method must be contained within this object as well.
         */
        get(opts?: { autoCreate: boolean }): Promise<[Bucket, APIReponse]>;
        get(cb: (err: Error, bucket: Bucket, apiResponse: APIReponse) => void): void;
        get(opts: { autoCreate: boolean }, cb: (err: Error, bucket: Bucket, apiResponse: APIReponse) => void): void;

        /**
         * Get File objects for the files currently in the bucket.
         */
        getFiles(query?: FileQuery): Promise<[File.File[], APIReponse]>;
        getFiles(cb: (err: Error, files: File.File[], apiResponse: APIReponse) => void): void;
        getFiles(query: FileQuery, cb: (err: Error, files: File.File[], apiResponse: APIReponse) => void): void;

        /**
         * Get storage/file objects for the files currently in the bucket as a readable object stream.
         */
        getFileStream(query?: FileQuery): ReadableStream;

        /**
         * Get the bucket's metadata.
         */
        getMetadata(): Promise<[BucketMetadata, APIReponse]>;
        getMetadata(cb: (err: Error, metadata: BucketMetadata, apiReponse: APIReponse) => void): void;

        /**
         * Get and set IAM policies for your bucket.
         */
        iam: {
            /**
             * Get the IAM policy.
             */
            getPolicy(): Promise<[IAM.Policy, APIReponse]>;
            getPolicy(cb: (err: Error, policy: IAM.Policy, apiResponse: APIReponse) => void): void;

            /**
             * Set the IAM policy.
             */
            setPolicy(policy: IAM.Policy): Promise<[IAM.Policy, APIReponse]>;
            setPolicy(policy: IAM.Policy, cb: (err: Error, policy: IAM.Policy, apiResponse: APIReponse) => void): void;

            /**
             * Test a set of permissions for a resource.
             */
            testPermissions(permissions: string | string[]): Promise<[IAM.Permission[], APIReponse]>;
            testPermissions(permissions: string | string[], cb: (err: Error, permissions: IAM.Permission[], apiReponse: APIReponse) => void): void;
        }

        /**
         * Make the bucket listing private.
         *
         * You may also choose to make the contents of the bucket private by specifying includeFiles: true. This will automatically run storage/file#makePrivate for every file in the bucket.
         *
         * When specifying includeFiles: true, use force: true to delay execution of your callback until all files have been processed. By default, the callback is executed after the first error. Use force to queue such errors until all files have been processed, after which they will be returned as an array as the first argument to your callback.
         *
         * NOTE: This may cause the process to be long-running and use a high number of requests. Use with caution.
         */
        makePrivate()
    }
}

declare namespace Channel {
    interface Channel {

    }
}

declare namespace File {
    namespace ACL {
        interface ACLOpts {
            generation?: number;
        }
    }

    interface FileOpts {
        generation?: string | number;
        key?: string;
    }

    interface File {

    }
}

declare namespace IAM {
    type Role = 'roles/storage.admin'
        | 'roles/storage.objectViewer'
        | 'roles/storage.objectCreator'
        | 'roles/storage.objectAdmin'
        | 'roles/storage.legacyObjectReader'
        | 'roles/storage.legacyObjectOwner'
        | 'roles/storage.legacyBucketReader'
        | 'roles/storage.legacyBucketWriter'
        | 'roles/storage.legacyBucketOwner';

    type Member = 'allUsers'
        | 'allAuthenticatedUsers'
        | string;

    interface Permission {
        // TODO: https://cloud.google.com/storage/docs/json_api/v1/buckets/testIamPermissions
    }

    interface Policy {
        kind?: string;
        resourceId?: string;
        bindings?: Array<{
            role?: Role;
            members?: Member[];
        }>;
        etag?: string;
    }
}

declare namespace Storage {
    interface ACL {
        OWNER_ROLE: 'OWNER';
        READER_ROLE: 'READER';
        WRITER_ROLE: 'WRITER';
    }

    interface BucketMetadata {
        /**
         * Specify the storage class as Coldline.
         */
        coldline?: boolean;

        /**
         * Specify the storage class as Durable Reduced Availability.
         */
        dra?: boolean;

        /**
         * Specify the storage class as Multi-Regional.
         */
        multiRegional?: boolean;

        /**
         * Specify the storage class as Nearline.
         */
        nearline?: boolean;

        /**
         * Specify the storage class as Regional.
         */
        regional?: boolean;

        // TODO: Add all the options: https://cloud.google.com/storage/docs/json_api/v1/buckets/insert
        [key: string]: any;
    }

    interface BucketQuery {
        /**
         * Have pagination handled automatically. Default: true.
         */
        autoPaginate?: boolean;
        /**
         * Maximum number of API calls to make.
         */
        maxApiCalls?: number;
        /**
         * Maximum number of items plus prefixes to return.
         */
        maxResults?: number;
        /**
         * A previously-returned page token representing part of the larger set of results to view.
         */
        pageToken?: string;
    }

    interface StorageStatic {
        /**
         * Cloud Storage uses access control lists (ACLs) to manage object and bucket access. ACLs are the mechanism you use to share objects with other users and allow other users to access your buckets and objects.
         */
        acl: ACL;

        /**
         * Get a reference to a Cloud Storage bucket.
         */
        bucket(name: string /* TODO | object*/): Bucket.Bucket;

        /**
         * Reference a channel to receive notifications about changes to your bucket.
         */
        channel(id: string, resourceId: string): Channel.Channel;

        /**
         * Create a bucket.
         */
        createBucket(name: Bucket.CreateBucketOpts, metadata?: BucketMetadata): Promise<[Bucket.Bucket, APIReponse]>;
        createBucket(name: Bucket.CreateBucketOpts, cb: (err: Error, bucket: Bucket.Bucket, apiResponse: APIReponse) => void): void;
        createBucket(
            name: Bucket.CreateBucketOpts,
            metadata: BucketMetadata,
            cb: (err: Error, bucket: Bucket.Bucket, apiResponse: APIReponse) => void
        ): void;

        /**
         * Get Bucket objects for all of the buckets in your project.
         */
        getBuckets(query?: BucketQuery): Promise<[Bucket.Bucket[], APIReponse]>;
        getBuckets(cb: (err: Error, buckets: Bucket.Bucket[], apiResponse: APIReponse) => void): void;
        getBuckets(query: BucketQuery, cb: (err: Error, buckets: Bucket.Bucket[], apiResponse: APIReponse) => void): void;

        /**
         * Get storage/bucket objects for all of the buckets in your project as a readable object stream.
         */
        getBucketStream(query?: BucketQuery): ReadableStream;
    }
}

declare module "@google-cloud/storage" {
    const _: (conf?: APIConfig) => Storage.StorageStatic;
    export default _;
}
