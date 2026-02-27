import {
	TInsertPage,
	TInsertProduct,
	TInsertUser,
	TSelectPage,
	TSelectProduct,
	TSelectUser,
	TUpdatePage,
	TUpdateProduct,
	TUpdateUser
} from "@drizzle/schema";



export interface IOrmService {
	getUserById(id: string): Promise<TSelectUser | undefined>

	getUsers(): Promise<TSelectUser[]>

	createUser(user: TInsertUser): Promise<TSelectUser>

	updateUserById(
		id: string,
		userUpdates: TUpdateUser
	): Promise<TSelectUser>

	deleteUserById(id: string): Promise<boolean>

	getProductById(id: string): Promise<TSelectProduct | undefined>

	getProductsByUserId(userId: string): Promise<TSelectProduct[]>

	createProduct(product: TInsertProduct): Promise<TSelectProduct>

	updateProductById(
		id: string,
		productUpdates: TUpdateProduct
	): Promise<TSelectProduct>

	deleteProductById(id: string): Promise<boolean>

	getPageById(id: string): Promise<TSelectPage | undefined>

	getPagesByUserId(userId: string): Promise<TSelectPage[]>

	createPage(page: TInsertPage): Promise<TSelectPage>

	updatePageById(id: string, pageUpdates: TUpdatePage): Promise<TSelectPage>

	deletePageById(id: string): Promise<boolean>

}



export const ORM_PROVIDERS = ['DRIZZLE'] as const