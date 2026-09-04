import { Drink, DrinkDataApi } from "./drinks";

export interface DrinkDetailsDataApi extends DrinkDataApi {
  strGlass: string,
  strInstructions: string,
  [key: string]: string | null | undefined;
}

export interface DrinkDetail extends Drink {
  glass: string,
  instructions: string,
  ingredients: { name: string; measure: string | null }[]
}

export const normalizeDrinkDetail = (detail: DrinkDetailsDataApi): DrinkDetail => {
  const ingredients: { name: string; measure: string | null }[] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}` as keyof DrinkDetailsDataApi;
    const measureKey = `strMeasure${i}` as keyof DrinkDetailsDataApi;

    const name = detail[ingredientKey];
    const measure = detail[measureKey];

    if (name) {
      ingredients.push({
        name: name as string,
        measure: (measure as string) ?? null,
      });
    }
  }

  return {
    id: detail.idDrink,
    name: detail.strDrink,
    category: detail.strCategory,
    type: detail.strAlcoholic,
    glass: detail.strGlass,
    instructions: detail.strInstructions,
    image: detail.strDrinkThumb,
    ingredients,
  };
};