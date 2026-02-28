export interface IAuthService {

	canProceed(request: Request): boolean
}



export const AUTH_PROVIDERS = ['SUPABASE'] as const