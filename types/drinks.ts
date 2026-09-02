export interface DrinkDataApi {
  idDrink: number,
  strDrink: string,
  strCategory: string,
  strAlcoholic: string,
  strDrinkThumb?: string
}

export interface Drink {
  id: number,
  name: string,
  category: string,
  type: string,
  image?: string
}

export const normalizeDrinkApi = (drink: DrinkDataApi): Drink => {
  return {
    id: drink.idDrink,
    name: drink.strDrink,
    category: drink.strCategory,
    type: drink.strAlcoholic,
    image: drink.strDrinkThumb
  }
}


