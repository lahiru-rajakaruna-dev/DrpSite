import {ILoggerService} from "@/app/api/_modules/logger_module/logger.interface";
import {TDrizzleOrm}    from "@/app/api/_modules/orm_module/drizzle.orm";
import {IOrmService}    from "@/app/api/_modules/orm_module/orm.interface";



export abstract class BaseOrmService
	implements IOrmService {
	private readonly _logger: ILoggerService
	protected abstract _driver: TDrizzleOrm;

	protected constructor(
		logger: ILoggerService
	) {
		this._logger = logger
	}

	get driver() {
		return this._driver;
	}

	get logger() {
		return this._logger;
	}
}