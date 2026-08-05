function getMealCardTemplate(meal) {
    return `<article class="mealCard">
                <img src="./assets/img/${meal.imgName}" alt="${meal.name}">
                <div class="mealCardContent">
                    <div class="mealCardLeftBox">
                        <h3>${meal.name}</h3>
                        <p class="mealCardDescription">${meal.description}</p>
                    </div>
                    <div class="mealCardRightBox">
                        <h3>${formatToCurrency(meal.price)}</h3>
                        <button class="addBasketBtn">Add to basket</button>
                    </div>
                </div>
            </article>`;
}