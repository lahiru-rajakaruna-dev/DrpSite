import {TOrmTypes} from "@/app/api/_modules/orm_module/orm.interface";
import {
	BaseRepository,
	RepositoryError
}                  from "@/app/api/_modules/repository_module/abstract.repository";
import {
	table_products,
	TInsertProduct,
	TSelectProduct,
	TUpdateProduct
}                  from "@drizzle/schema";
import {eq}        from "drizzle-orm";
import {and}       from "drizzle-orm/sql/expressions/conditions";



export class ProductRepository<TOrmType extends TOrmTypes> {

	private readonly base_repository: BaseRepository<TOrmType>

	constructor(baseRepository: BaseRepository<TOrmType>) {
		this.base_repository = baseRepository
	}

	async createOne(
		userID: string,
		data: TInsertProduct
	): Promise<TSelectProduct> {
		if (!userID) {
			throw new RepositoryError(
				'USER_ID not provided',
				'create_one'
			)
		}

		if (Object.entries(data).length <= 0) {
			throw new RepositoryError(
				'Invalid data',
				'create_one'
			)
		}

		const result = await this.base_repository.orm.driver.insert(
			table_products).values({

									   ...data,
									   product_owner_id: userID,
								   }
		).returning()

		return this.base_repository.logger.logAndReturn(
			result[0],
			'operation: create_one'
		)
	}

	async getAll(userID: string): Promise<TSelectProduct[]> {
		if (!userID) {
			throw new RepositoryError(
				'USER_ID not provided',
				'get_all'
			)
		}

		const result = await this.base_repository.orm.driver.query.table_products.findMany(
			{
				where(columns) {
					return eq(columns.product_owner_id, userID)
				}
			})

		return this.base_repository.logger.logAndReturn(
			result,
			'operation: get_all'
		)
	}

	async getOne(
		userID: string,
		id: string
	): Promise<TSelectProduct | undefined> {
		if (!userID) {
			throw new RepositoryError(
				'USER_ID not provided',
				'get_one'
			)
		}

		if (!id) {
			throw new RepositoryError(
				'ID not provided',
				'get_one'
			)
		}

		const result = await this.base_repository.orm.driver.query.table_products.findFirst(
			{
				where(columns) {
					return (and(
						eq(columns.product_owner_id, userID),
						eq(columns.product_id, id)
					))
				}
			}
		)

		return this.base_repository.logger.logAndReturn(
			result,
			'operation: get_one'
		);
	}

	async updateOne(
		userID: string,
		id: string,
		updates: TUpdateProduct
	): Promise<TSelectProduct | undefined> {
		if (!userID) {
			throw new RepositoryError(
				'USER_ID not provided',
				'update_one'
			)
		}

		if (!id) {
			throw new RepositoryError(
				'ID not provided',
				'update_one'
			)
		}

		if (Object.entries(updates).length <= 0) {
			throw new RepositoryError(
				'Invalid updates',
				'update_one'
			)
		}

		const result = await this.base_repository.orm.driver.update(
			table_products).set(updates).where(
			and(
				eq(table_products.product_owner_id, userID),
				eq(table_products.product_id, id)
			)
		).returning()

		return this.base_repository.logger.logAndReturn(
			result[0],
			'operation: update_one'
		);
	}

	async deleteOne(
		userID: string,
		id: string
	): Promise<boolean> {
		if (!userID) {
			throw new RepositoryError(
				'USER_ID not provided',
				'delete_one'
			)
		}

		if (!id) {
			throw new RepositoryError(
				'ID not provided',
				'delete_one'
			)
		}

		const result = await this.base_repository.orm.driver.delete(
			table_products).where(
			and(
				eq(table_products.product_owner_id, userID),
				eq(table_products.product_id, id)
			)
		);

		this.base_repository.logger.logAndReturn(
			result,
			'operation: delete_one'
		)

		return true
	}

}