import {LoggerServiceFactory} from "@/app/api/_modules/logger_module/logger.factory";
import {ILoggerService}       from "@/app/api/_modules/logger_module/logger.interface";
import {IOrmService}          from "@/app/api/_modules/orm_module/orm.interface";



export abstract class BaseOrmService
	implements IOrmService {
	private readonly _logger: ILoggerService
	private readonly _driver: TDriver;

	protected constructor(
		dbDriver: TDriver,
	) {
		this._logger = LoggerServiceFactory.getLogger()
		this._driver = dbDriver
	}

	get driver(): TDriver {
		return this._driver;
	}

	get logger(): ILoggerService {
		return this._logger
	}

}