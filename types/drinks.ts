export interface DrinkDataApi {
  idDrink: string,
  strDrink: string,
  strCategory: string,
  strAlcoholic: string,
  strDrinkThumb: string | null
}

export interface Drink {
  id: string,
  name: string,
  category: string | null,
  type?: string,
  image: string | null
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


