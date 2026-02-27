import {LoggerServiceFactory} from "@/app/api/_modules/logger_module/logger.factory";
import {OrmServiceFactory}    from "@/app/api/_modules/orm_module/orm.factory";
import {IOrmService}          from "@/app/api/_modules/orm_module/orm.interface";
import {
	BaseRepository,
	RepositoryError
}                             from "@/app/api/_modules/repository_module/abstract.repository";
import {
	TInsertPage,
	TSelectPage,
	TUpatePage
}                             from "@drizzle/schema";



export class ProductRepository
	extends BaseRepository<TSelectPage, TUpatePage, TInsertPage> {
	private static instance: ProductRepository;

	private constructor(orm: IOrmService) {
		super(
			LoggerServiceFactory.getLogger(),
			orm
		)
	}

	public static async getInstance() {
		if (!this.instance) {
			const orm     = await OrmServiceFactory.getService()
			this.instance = new ProductRepository(orm)
		}

		return this.instance
	}

	async createOne(
		userID: string,
		data: TInsertPage
	): Promise<TSelectPage> {
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

		const result = await this.orm.createProduct(
			userID,
			data
		)

		return this.logger.logAndReturn(
			result,
			'operation: create_one'
		)
	}

	async getAll(userID: string): Promise<TSelectPage[]> {
		if (!userID) {
			throw new RepositoryError(
				'USER_ID not provided',
				'get_all'
			)
		}

		const result = await this.orm.getProductsByUserId(userID)

		return this.logger.logAndReturn(
			result,
			'operation: get_all'
		)
	}

	async getOne(
		userID: string,
		id: string
	): Promise<TSelectPage | undefined> {
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

		const result = await this.orm.getProductById(
			userID,
			id
		)
		return this.logger.logAndReturn(
			result,
			'operation: get_one'
		);
	}

	async updateOne(
		userID: string,
		id: string,
		updates: TUpatePage
	): Promise<TSelectPage | undefined> {
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

		const result = await this.orm.updateProductById(
			userID,
			id,
			updates
		)
		return this.logger.logAndReturn(
			result,
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

		const result = await this.orm.deleteProductById(
			userID,
			id
		);
		return this.logger.logAndReturn(
			result,
			'operation: delete_one'
		)
	}

}