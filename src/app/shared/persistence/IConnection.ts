import { PoolConnection } from 'mysql2/promise'

export interface SqlConnection {
    getConnection(): Promise<PoolConnection>
    close(): void
}