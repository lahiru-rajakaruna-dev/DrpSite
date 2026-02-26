import {DrizzleOrmService}          from "@/app/api/_modules/orm_module/drizzle.orm";
import {IOrmService, ORM_PROVIDERS} from "@/app/api/_modules/orm_module/orm.interface";
import * as dotenv                  from 'dotenv'
import path                         from "node:path";



dotenv.config({
				  path: [
					  path.resolve(
						  process.cwd(),
						  './env.development',
					  ),
					  path.resolve(
						  process.cwd(),
						  './env.production',
					  )
				  ]
			  })



export class OrmServiceFactory {
	public static async getService(): Promise<IOrmService> {
		const ormOption = process.env.ORM_PROVIDER

		switch (ormOption) {
			case 'DRIZZLE':
				return await DrizzleOrmService.getInstance()
			default:
				throw new Error(`Invalid orm option.
 Available Options: ${ORM_PROVIDERS.join(' | ')}`)
		}
	}
}