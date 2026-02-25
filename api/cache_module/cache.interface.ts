export interface ICacheService {
    getItem<T extends Record<string, any>>(key: string): T | undefined

    setItem<T extends Record<string, any>>(key: string, item: T): boolean

    updateItem<T extends Record<string, any>>(key: string, item: T): boolean

    hasItem(key: string): boolean
}


export const CACHE_PROVIDERS = [
    'LRU',
    'NODE_CACHE'
] as const