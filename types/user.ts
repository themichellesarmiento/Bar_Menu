export interface UserModel {
  username: string,
  password: string,
  favoriteCategory: string | null
}

export interface AuthContextType {
  user: UserModel | null,
  setFavoriteCategory: (category: string) => void
  logIn: (user: UserModel) => void
  logOut: () => void

}