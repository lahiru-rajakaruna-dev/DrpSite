export interface IRepository<TInsert, TSelect, TUpdate> {
	createOne(data: TInsert): Promise<TSelect>

	getOne(
		userID: string,
		id: string
	): Promise<TSelect | undefined>

	getAll(userID: string): Promise<TSelect[]>

	updateOne(
		userID: string,
		id: string,
		updates: TUpdate
	): Promise<TSelect | undefined>

	deleteOne(userID: string, id: string): Promise<boolean>
}



export interface IUserManagable<TInsert, TSelect, TUpdate> {

	createUser(data: TInsert): Promise<TSelect>

	getUser(id: string): Promise<TSelect | undefined>

	getAllUsers(): Promise<TSelect[]>

	updateUser(id: string, updates: TUpdate): Promise<TSelect | undefined>

	deleteUser(id: string): Promise<boolean>
}



export interface IProductManagable<TInsert, TSelect, TUpdate> {
	createProduct(data: TInsert): Promise<TSelect>

	getProduct(userID: string, id: string): Promise<TSelect>

	getAllProducts(userID: string): Promise<TSelect[]>

	updateProduct(userID: string, id: string): Promise<TSelect>

	deleteProduct(userID: string, id: string): Promise<boolean>
}