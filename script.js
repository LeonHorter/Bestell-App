function renderMeals() {
    let contentRef = [
        document.getElementById('burger'),
        document.getElementById('pizza'),
        document.getElementById('salad')
    ];

    for (let contentRefIndex = 0; contentRefIndex < contentRef.length; contentRefIndex++) {
        contentRef[contentRefIndex].innerHTML = '';

        const mealsFilter = meals.filter(meal => meal.category === contentRef[contentRefIndex].id);
        mealsFilter.forEach((meal) => contentRef[contentRefIndex].innerHTML += getMealCardTemplate(meal));
    }
}

function renderBasket() {
    let emptyBasketContentRef = document.getElementById('basketEmpty');
    let filledBasketContentRef = document.getElementById('basketFilled');

    if (basket == '') {
        renderEmptyBasket(emptyBasketContentRef, filledBasketContentRef);
    } else {
        renderFilledBasket(emptyBasketContentRef, filledBasketContentRef);
    }
}

function renderEmptyBasket(emptyBasketContentRef, filledBasketContentRef) {
    emptyBasketContentRef.classList.remove('dNone');
    filledBasketContentRef.classList.add('dNone');
}

function renderFilledBasket(emptyBasketContentRef, filledBasketContentRef) {
    emptyBasketContentRef.classList.add('dNone');
    filledBasketContentRef.classList.remove('dNone');

    let basketContentRef = document.getElementById('basketContent');
    basketContentRef.innerHTML = '';

    for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
        basketContentRef.innerHTML += getBasketItemTemplate(basket[basketIndex]);
    }
}

function formatToCurrency(value) {
    value = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
    return value;
}

function addToBasket(mealName) {
    const mealObjekt = meals.find(meal => meal.name === mealName);
    basket.push(mealObjekt);

    renderBasket();
}