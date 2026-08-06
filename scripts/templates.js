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
                        <button class="addBasketBtn" onclick="addToBasket('${meal.name}')">Add to basket</button>
                    </div>
                </div>
            </article>`;
}

function getBasketItemTemplate(meal) {
    return `<div class="basketItem">
                <p>${meal.name}</p>
                <div class="basketItemLowerBox">
                    <div class="basketItemActions">
                        <button class="deleteBtn basketItemBtn" onclick="removeFromBasket('${meal.name}')"></button>
                        1
                        <button class="basketItemBtn">+</button>
                    </div>
                    <p>${formatToCurrency(meal.price)}</p>
                </div>
            </div>`;
}