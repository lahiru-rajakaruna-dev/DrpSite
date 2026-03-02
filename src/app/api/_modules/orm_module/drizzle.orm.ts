import {LoggerServiceFactory} from "@/app/api/_modules/logger_module/logger.factory";
import {ILoggerService}       from "@/app/api/_modules/logger_module/logger.interface";
import {BaseOrmService}       from "@/app/api/_modules/orm_module/abstract.orm";
import {IOrmService}          from "@/app/api/_modules/orm_module/orm.interface";
import * as schema            from "@drizzle/schema";

import * as dotenv from 'dotenv'
import {drizzle}   from "drizzle-orm/node-postgres/driver";
import path        from "node:path";
import {Client}    from "pg";



dotenv.config({
				  path: [
					  path.resolve(
						  process.cwd(),
						  './env.development'
					  ), path.resolve(
						  process.cwd(),
						  './env.production'
					  )
				  ]
			  })

export type TDrizzleOrm = ReturnType<typeof drizzle<typeof schema, Client>>



export class DrizzleOrmService
	extends BaseOrmService {

	private static instance: DrizzleOrmService | undefined;
	protected readonly _driver: TDrizzleOrm;

	private constructor(
		driver: TDrizzleOrm,
	) {
		super(
			driver,
		)

	}

	public static async getInstance(): Promise<IOrmService<TDrizzleOrm>> {
		if (!this.instance) {
			const dbClient = new Client({
											connectionString: process.env.DATABASE_URL,
										})

			await dbClient.connect()
			const drizzle_driver = drizzle<typeof schema, Client>(dbClient)

			this.instance = new DrizzleOrmService(
				drizzle_driver,
			)
		}

		return this.instance
	}

}



export class OrmError extends Error {
	private readonly context: Record<string, any> = {}
	private readonly operation: string;

	constructor(
		message: string,
		operation: string,
		context: Record<string, any> = {}
	) {
		super(message);
		this.operation = operation
		this.context   = context
	}

	toString() {
		return {
			message  : this.message,
			operation: this.operation,
			context  : this.context
		}
	}

}