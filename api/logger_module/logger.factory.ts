import * as dotenv               from 'dotenv'
import path                      from "node:path";
import {ConsoleLoggerService}    from "./console_logger.service";
import {ILoggerService, LOGGERS} from "./logger.interface";

dotenv.config({
                  path: [
                      path.resolve(process.cwd(), './env.development'),
                      path.resolve(process.cwd(), './env.production')
                  ]
              })

export class LoggerServiceFactory {
    public static getLogger(): ILoggerService {

        const providedLoggerFromEnv = process.env.LOGGER
        switch (providedLoggerFromEnv) {
            case 'CONSOLE':
                return ConsoleLoggerService.getInstance()
            default:
                throw new Error(`Invalid logger option.
Available Options: ${LOGGERS.join(' | ')}`)
        }
    }
}