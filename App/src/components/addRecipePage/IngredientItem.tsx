import * as React from 'react';

export interface Ingredient {
    name: string,
    amount: number,
    unit: string
  }

const IngredientItem: React.FunctionComponent<Ingredient> = (props) => {
    return(
        <div>

        </div>
    )
}

export default IngredientItem;