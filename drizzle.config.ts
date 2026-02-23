import { defineConfig } from 'drizzle-kit'



export default defineConfig({
								schema : './drizzle/schema',
								dialect: 'postgresql',
								casing : 'snake_case',
								out    : './drizzle_migrations',
								verbose: true,
								
							})