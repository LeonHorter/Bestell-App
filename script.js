function renderMeals() {
    let contentRef = [
        document.getElementById('burger'),
        document.getElementById('pizza'),
        document.getElementById('salad')
    ];

    for (let contentRefIndex = 0; contentRefIndex < contentRef.length; contentRefIndex++) {
        contentRef[contentRefIndex].innerHTML = '';

        const mealsFilter = meals.filter(meal => meal.category == contentRef[contentRefIndex].id);
        mealsFilter.forEach(meal => contentRef[contentRefIndex].innerHTML += getMealCardTemplate(meal));
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
        if (basket[basketIndex].amount == 1) {
            basketContentRef.innerHTML += getBasketItemTemplateQuantityOne(basket[basketIndex]);
        } else {
            basketContentRef.innerHTML += getBasketItemTemplate(basket[basketIndex]);
        }
    }
}

function formatToCurrency(value) {
    value = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    return value;
}

function addToBasket(mealName) {
    let mealObj = meals.find(meal => meal.name == mealName);
    let basketMealObj = basket.find(element => element.name == mealObj.name);

    if (basketMealObj == null) {
        basket.push({ ...mealObj, amount: 1 });   // kopiert Referenz von mealObj und fügt amount nur in basket hinzu
    } else {
        basketMealObj.amount++;
    }

    renderBasket();
    calculateBasket();
    updateMealCard(mealName);
}

function reduceQuantity(mealName) {
    let basketMealObj = basket.find(element => element.name == mealName);

    basketMealObj.amount--;

    renderBasket();
    calculateBasket();
    updateMealCard(mealName);
}

function removeFromBasket(mealName) {
    const mealIndex = basket.findIndex(meal => meal.name == mealName);
    basket.splice(mealIndex, 1);

    renderBasket();
    calculateBasket();
    updateMealCard(mealName);
}

function updateMealCard(mealName) {
    let btnContentRef = document.getElementById('addBasketBtn-' + mealName);
    let divContentRef = document.getElementById('mealCardLeftBox-' + mealName);
    let basketMealObj = basket.find(element => element.name == mealName);

    if (basketMealObj != null) {
        btnContentRef.innerText = 'Added ' + basketMealObj.amount;
        btnContentRef.classList.add('orangeFontColor');
        divContentRef.classList.add('marginLeft');
    } else {
        btnContentRef.innerText = 'Add to basket';
        btnContentRef.classList.remove('orangeFontColor');
        divContentRef.classList.remove('marginLeft');
    }
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

function confirmOrder() {
    let dialogRef = document.getElementById('confirmationMessage');
    
    emptyBasket();
    dialogRef.showModal();

    setTimeout(() => {
        dialogRef.close();
    }, 2500);
}

function emptyBasket() {
    let basketRef = document.getElementById('basketScrollContainer');

    basketRef.classList.add('dNone');
    basket = [];
    renderMeals();
}

function closeDialog() {
    let dialogRef = document.getElementById('confirmationMessage');

    dialogRef.close();
}

// function toggleBasket() {
//     let basketRef = document.getElementById('basketScrollContainer');

//     basketRef.setAttribute('display', 'flex');
// }