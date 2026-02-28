import {IAuthService}   from "@/app/api/_modules/auth_module/auth.interface";
import {ILoggerService} from "@/app/api/_modules/logger_module/logger.interface";
import {NextApiRequest} from "next";
import {NextResponse}   from "next/server";



export abstract class BaseAuthService implements IAuthService {
	protected static auth_service_instance: IAuthService;
	protected readonly logger: ILoggerService;

	protected constructor(logger: ILoggerService) {
		this.logger = logger
	}

	abstract canProceed(request: Request): boolean

}