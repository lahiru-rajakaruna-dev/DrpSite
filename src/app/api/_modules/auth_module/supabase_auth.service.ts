import {BaseAuthService}      from "@/app/api/_modules/auth_module/base.auth.service";
import {LoggerServiceFactory} from "@/app/api/_modules/logger_module/logger.factory";
import {
	createClient,
	SupabaseClient
}                             from "@supabase/supabase-js";

import * as dotenv   from 'dotenv'
import {NextRequest} from "next/server";
import path          from "node:path";



dotenv.config({
				  path: [
					  path.resolve(process.cwd(), './env.development'),
					  path.resolve(process.cwd(), './env.production')
				  ]
			  })



export class SupabaseAuthService extends BaseAuthService {
	private readonly supabase_client: SupabaseClient

	private constructor(url: string, key: string) {
		super(LoggerServiceFactory.getLogger())
		this.supabase_client = createClient(url, key, {})
	}

	public static getInstance() {
		const SUPABASE_URL = process.env.SUPABASE_PROJECT_URL
		const SUPABASE_KEY = process.env.SUPABASE_KEY

		if (!this.instance) {
			this.instance = new SupabaseAuthService(
				SUPABASE_URL!,
				SUPABASE_KEY!
			)
		}

		return this.instance
	}

	canProceed(request: Request): boolean {
		const parsedReq = new NextRequest(new URL(request.url), request)

		return true;
	}
}