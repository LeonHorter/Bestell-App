function renderMeals() {
    let contentRef = [
        document.getElementById('burger'),
        document.getElementById('pizza'),
        document.getElementById('salad')
    ];

    for (let contentRefIndex = 0; contentRefIndex < contentRef.length; contentRefIndex++) {
        contentRef[contentRefIndex].innerHTML = '';

        const mealsFilter = meals.filter(meal => meal.category == contentRef[contentRefIndex].id);
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
    value = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(value);
    return value;
}

function addToBasket(mealName) {
    let mealObj = meals.find(meal => meal.name == mealName);
    let basketMealObj = basket.find((element) => element.name == mealObj.name);

    if (basketMealObj == null) {
        basket.push({...mealObj, amount : 1});   // kopiert Referenz von mealObj und fügt amount nur in basket hinzu
    } else {
        basketMealObj.amount++;
    }

    renderBasket();
    calculateBasket();
}

function removeFromBasket(mealName) {
    const mealIndex = basket.findIndex(meal => meal.name == mealName);
    basket.splice(mealIndex, 1);

    renderBasket();
    calculateBasket();
}

function calculateBasket() {
    let subtotalAmountContentRef = document.getElementById('subtotalAmount');
    let deliveryAmountContentRef = document.getElementById('deliveryAmount');
    let totalAmountContentRef = document.getElementById('totalAmount');
    let buyBtnTotalAmount = document.getElementById('buyBtnTotalAmount');
    let subtotalAmount = 0;

    for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
        subtotalAmount += basket[basketIndex].amount * basket[basketIndex].price;
    }

    let totalAmount = subtotalAmount + deliveryFee;

    subtotalAmountContentRef.innerText = formatToCurrency(subtotalAmount);
    deliveryAmountContentRef.innerText = formatToCurrency(deliveryFee);
    totalAmountContentRef.innerText = formatToCurrency(totalAmount);
    buyBtnTotalAmount.innerText = formatToCurrency(totalAmount);
}