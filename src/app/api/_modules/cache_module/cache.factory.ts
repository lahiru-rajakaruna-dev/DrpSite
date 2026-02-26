import * as dotenv                      from 'dotenv'
import path                             from 'node:path';
import {CACHE_PROVIDERS, ICacheService} from './cache.interface';
import {LRUCacheService}                from "./lru_cache.service";
import {NodeCacheService}               from "./node_cache.service";



dotenv.config({
				  debug: true,
				  path : [
					  path.resolve(process.cwd(), '.env.development'),
					  path.resolve(process.cwd(), '.env.production')
				  ],
			  })



export class CacheServiceFactory {
	public getCacheService(): ICacheService {
		const cache_provider = process.env.CACHE_PROVIDER

		switch (cache_provider) {
			case 'NODE_CACHE':
				return NodeCacheService.getInstance()
			case 'LRU':
				return LRUCacheService.getInstance();
			default:
				throw new Error(`Invalid cache provider: ${cache_provider}\nAvailable Options:${CACHE_PROVIDERS.join(
					' | ')}`)
		}
	}
}
