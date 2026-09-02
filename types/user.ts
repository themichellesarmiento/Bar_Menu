export interface UserModel {
  username: string,
  password: string,
  favoriteCategory: string | null
}

export interface AuthContextType {
  user: UserModel | null,
  setUser: (user: UserModel) => void

}