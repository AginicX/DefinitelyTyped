declare module '@google-cloud/datastore' {
    interface ReadableStream<T> {
        on(event: 'error', cb: (err: Error) => void): void;
        on(event: 'data', cb: (data: T) => void): void;
        on(event: 'end', cb: () => void): void;
        on(event: 'info', cb: (info: QueryInfo) => void): void;
    }

    interface Key {
        namespace: string;
        path: [string, number];
    }

    interface DataStoreDouble {}
    interface DataStoreGeoPoint {}
    interface DataStoreInt {}

    interface APIResponse {}

    type QueryOp = '=' | '<' | '>' | '<=' | '>=';
    interface Query {
        end(cursor: string): this;
        filter<T = any>(prop: string, value: T): this;
        filter<T = any>(prop: string, op: QueryOp, value: T): this;
        groupBy(props: string[]): this;
        hasAncestor(key: Key): this;
        limit(n: number): this;
        offset(n: number): this;
        order(prop: string, opts?: { descending: boolean }): this;
        runQuery<T = any>(opts?: GetOpts): Promise<[T[], QueryInfo]>;
        runQueryStream<T = any>(opts?: GetOpts): ReadableStream<T>;
        select(fields: string | string[]): this;
        start(cursor: string): this;
    }

    interface GetOpts {
        consistency?: 'strong' | 'eventual';
        maxApiCalls?: number;
    }

    interface QueryInfo {
        endCursor: string | null;
        moreResults: Symbol;
    }

    interface SaveObject<T> {
        name: string;
        value: T;
        excludeFromIndexes?: boolean;
    }

    interface SaveEntity<T> {
        key: Key;
        method?: 'insert' | 'update' | 'upsert';
        data: T | SaveObject<T>;
    }

    interface DataStoreOperations {
        allocateIds(
            incompleteKey: Key,
            n: number,
        ): Promise<[Key[], APIResponse]>;
        createQuery(kind: string): Query;
        createQuery(namespace: string, kind: string): Query;
        createReadStream<T = any>(
            key: Key | Key[],
            opts?: GetOpts,
        ): ReadableStream<T>;
        delete(key: Key | Key[]): Promise<[APIResponse]>;
        get<T = any>(key: Key | Key[], opts?: GetOpts): Promise<[T | T[]]>;
        runQuery<T = any>(
            query: Query,
            opts?: GetOpts,
        ): Promise<[T[], QueryInfo]>;
        runQueryStream<T = any>(
            query: Query,
            opts?: GetOpts,
        ): ReadableStream<T>;
        save<T = any>(
            entity: SaveEntity<T> | SaveEntity<T>[],
        ): Promise<[APIResponse]>;
    }

    interface Transaction extends DataStoreOperations {
        commit(): Promise<[APIResponse]>;
        rollback(): Promise<[APIResponse]>;
        run(): Promise<[Transaction, APIResponse]>;
    }

    interface DataStoreStatic extends DataStoreOperations {
        KEY: Symbol;
        MORE_RESULTS_AFTER_CURSOR: Symbol;
        MORE_RESULTS_AFTER_LIMIT: Symbol;
        NO_MORE_RESULTS: Symbol;

        double(val: number): DataStoreDouble;
        geoPoint(coords: {
            latitude: number;
            longitude: number;
        }): DataStoreGeoPoint;
        int(val: number): DataStoreInt;

        key(namespace: string): Key;
        key(path: [string, number]): Key;
        key(path: [string, DataStoreInt]): Key;
        key(path: [string, string]): Key;
        key(key: Partial<Key>): Key;

        transaction(): Transaction;
    }

    interface GlobalConfig {
        projectId: string;
        keyFileName: string;
        apiEndpoint?: string;
        namespace?: string;
    }

    const _: (conf?: GlobalConfig) => DataStoreStatic;
    export = _;
}
