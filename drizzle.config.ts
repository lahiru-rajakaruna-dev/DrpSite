import * as dotenv      from 'dotenv'
import { defineConfig } from 'drizzle-kit'



dotenv.config({
				  path: './.env.development'
			  })

export default defineConfig({
								schema       : './drizzle/schema',
								dialect      : 'postgresql',
								casing       : 'snake_case',
								out          : './drizzle_migrations',
								verbose      : true,
								dbCredentials: {
									url: process.env.DATABASE_URL!,
								}
							})