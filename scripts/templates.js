function getMealCardTemplate(meal) {
    return `<article class="mealCard">
                <img src="./assets/img/${meal.imgName}" alt="${meal.name}">
                <div class="mealCardContent">
                    <div id="mealCardLeftBox-${meal.name}" class="mealCardLeftBox">
                        <h3>${meal.name}</h3>
                        <p class="mealCardDescription">${meal.description}</p>
                    </div>
                    <div class="mealCardRightBox">
                        <h3>${formatToCurrency(meal.price)}</h3>
                        <button id="addBasketBtn-${meal.name}" class="addBasketBtn" onclick="addToBasket('${meal.name}')">Add to basket</button>
                    </div>
                </div>
            </article>`;
}

function getBasketItemTemplate(meal) {
    return `<div class="basketItem">
                <div class="basketItemBox">
                    <p>${meal.name}</p>
                    <button class="deleteBtn iconBtn" onclick="removeFromBasket('${meal.name}')"></button>
                </div>
                <div class="basketItemBox">
                    <div class="basketItemActions">
                        <button class="iconBtn" onclick="reduceQuantity('${meal.name}')">-</button>
                        ${meal.amount}
                        <button class="iconBtn" onclick="addToBasket('${meal.name}')">+</button>
                    </div>
                    <p>${formatToCurrency(meal.amount * meal.price)}</p>
                </div>
            </div>`;
}

function getBasketItemTemplateQuantityOne(meal) {
    return `<div class="basketItem">
                <p>${meal.name}</p>
                <div class="basketItemBox">
                    <div class="basketItemActions">
                        <button class="deleteBtn iconBtn" onclick="removeFromBasket('${meal.name}')"></button>
                        ${meal.amount}
                        <button class="iconBtn" onclick="addToBasket('${meal.name}')">+</button>
                    </div>
                    <p>${formatToCurrency(meal.amount * meal.price)}</p>
                </div>
            </div>`;
}