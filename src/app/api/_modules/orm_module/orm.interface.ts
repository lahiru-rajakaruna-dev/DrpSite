import {ILoggerService} from "@/app/api/_modules/logger_module/logger.interface";
import {TDrizzleOrm}    from "@/app/api/_modules/orm_module/drizzle.orm";



export interface IOrmService<TDriver = unknown> {

	get driver(): TDriver

	get logger(): ILoggerService

}



export const ORM_PROVIDERS = ['DRIZZLE'] as const