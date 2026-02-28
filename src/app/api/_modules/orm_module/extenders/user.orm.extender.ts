import {BaseOrmService} from "@/app/api/_modules/orm_module/abstract.orm";
import {
	OrmError,
	TDrizzleOrm
}                       from "@/app/api/_modules/orm_module/drizzle.orm";
import {
	table_users,
	TInsertUser,
	TSelectUser,
	TUpdateUser
}                       from "@drizzle/schema";
import {eq}             from "drizzle-orm";



export class UserExtendedOrm {
	private readonly base_orm: BaseOrmService<TDrizzleOrm>;

	public constructor(baseOrm: BaseOrmService<TDrizzleOrm>) {
		this.base_orm = baseOrm
	}

	async createUser(user: TInsertUser): Promise<TSelectUser> {
		try {
			const result = await this.base_orm.driver.insert(table_users)
									 .values(user)
									 .returning()
			return this.base_orm.logger.logAndReturn(
				result[0],
				'operation: create_user'
			);
		} catch (e) {
			throw new OrmError(
				(e as Error).message,
				'create_user',
				{data: user}
			)
		}
	}

	async getUserById(id: string): Promise<TSelectUser | undefined> {
		try {
			const result = await this.base_orm.driver.query.table_users.findFirst({
																					  where(columns) {
																						  return eq(
																							  columns.user_id,
																							  id
																						  )
																					  }
																				  })
			return this.base_orm.logger.logAndReturn(
				result,
				'operation: get_user_by_id'
			)
		} catch (e) {
			throw new OrmError(
				(e as Error).message,
				'get_user_by_id',
				{id: id}
			)
		}
	}

	async getUsers(): Promise<TSelectUser[]> {
		try {
			const result = await this.base_orm.driver.query.table_users
									 .findMany()

			return this.base_orm.logger.logAndReturn(
				result,
				'get_users'
			)
		} catch (e) {
			throw new OrmError(
				(e as Error).message,
				'get_users'
			)
		}
	}

	async updateUserById(
		id: string,
		userUpdates: TUpdateUser
	): Promise<TSelectUser> {
		try {
			const result = await this.base_orm.driver.update(table_users)
									 .set(userUpdates)
									 .where(eq(
										 table_users.user_id,
										 id
									 ))
									 .returning()

			return this.base_orm.logger.logAndReturn(
				result[0],
				'operation: update_user_by_id'
			)
		} catch (e) {
			throw new OrmError(
				(e as Error).message,
				'update_user_by_id',
				{id: id, updates: userUpdates}
			)
		}
	}

	async deleteUserById(id: string): Promise<boolean> {
		try {
			const result = await this.base_orm.driver.delete(table_users)
									 .where(eq(
										 table_users.user_id,
										 id
									 ))
									 .returning()
			this.base_orm.logger.log(JSON.stringify(result[0]))
			return true
		} catch (e) {
			throw new OrmError(
				(e as Error).message,
				'delete_user',
				{id: id}
			)
		}
	}
}