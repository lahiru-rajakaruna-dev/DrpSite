import {IAuthService}   from "@/app/api/_modules/auth_module/auth.interface";
import {ILoggerService} from "@/app/api/_modules/logger_module/logger.interface";



export abstract class BaseAuthService implements IAuthService {
	protected static instance: BaseAuthService;
	protected readonly logger: ILoggerService;

	protected constructor(logger: ILoggerService) {
		this.logger = logger
	}

	abstract canProceed(request: Request): boolean

}