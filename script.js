const basketContentRefs = [
    {
        empty: document.getElementById('basketDesktopEmpty'),
        filled: document.getElementById('basketDesktopFilled')
    },
    {
        empty: document.getElementById('basketMobileEmpty'),
        filled: document.getElementById('basketMobileFilled')
    }
];

const basketRefs = [
    document.getElementById('basketDesktopContent'),
    document.getElementById('basketMobileContent')
];

const categoryContentRefs = [
    document.getElementById('burger'),
    document.getElementById('pizza'),
    document.getElementById('salad')
];

const subtotalAmountContentRefs = [
    document.getElementById('subtotalDesktopAmount'),
    document.getElementById('subtotalMobileAmount')
];

const deliveryAmountContentRefs = [
    document.getElementById('deliveryDesktopAmount'),
    document.getElementById('deliveryMobileAmount')
];

const totalAmountContentRefs = [
    document.getElementById('totalDesktopAmount'),
    document.getElementById('totalMobileAmount')
];

const buyBtnTotalContentRefs = [
    document.getElementById('buyBtnDesktopTotalAmount'),
    document.getElementById('buyBtnMobileTotalAmount')
];

const quantityBadgeContainerRef = document.getElementById('quantityBadgeContainer');

const quantityBadgeRef = document.getElementById('quantityBadge');

const basketBtnRef = document.getElementById('basketBtn');

const basketMobileRef = document.getElementById('basketMobile');

const confirmationDialogRef = document.getElementById('confirmationMessage');

let basket = [];

let deliveryFee = 4.99;

function renderMeals() {
    for (let contentRefsIndex = 0; contentRefsIndex < categoryContentRefs.length; contentRefsIndex++) {
        categoryContentRefs[contentRefsIndex].innerHTML = '';

        const mealsFilter = meals.filter(meal => meal.category == categoryContentRefs[contentRefsIndex].id);
        mealsFilter.forEach(meal => categoryContentRefs[contentRefsIndex].innerHTML += getMealCardTemplate(meal));
    }
}

function renderBasket() {
    if (basket.length == 0) {
        basketContentRefs.forEach(element => renderEmptyBasket(element.empty, element.filled));
    } else {
        basketContentRefs.forEach(element => renderFilledBasket(element.empty, element.filled));
    }

    renderQuantityBadge();
}

function renderEmptyBasket(emptyBasketContentRef, filledBasketContentRef) {
    emptyBasketContentRef.classList.remove('dNone');
    filledBasketContentRef.classList.add('dNone');
}

function renderFilledBasket(emptyBasketContentRef, filledBasketContentRef) {
    emptyBasketContentRef.classList.add('dNone');
    filledBasketContentRef.classList.remove('dNone');

    basketRefs.forEach(element => element.innerHTML = '');

    for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
        if (basket[basketIndex].amount == 1) {
            basketRefs.forEach(element => element.innerHTML += getBasketItemTemplateQuantityOne(basket[basketIndex]));
        } else {
            basketRefs.forEach(element => element.innerHTML += getBasketItemTemplate(basket[basketIndex]));
        }
    }
}

function renderQuantityBadge() {
    let basketQuantity = 0;
    
    if (basket.length == 0) {
        quantityBadgeContainerRef.classList.add('dNone');
        basketBtnRef.classList.remove('basketBtnBasketFilled');
    } else {
        quantityBadgeContainerRef.classList.remove('dNone');
        basketBtnRef.classList.add('basketBtnBasketFilled');
    }

    basket.forEach(element => basketQuantity += element.amount);
    quantityBadgeRef.innerText = basketQuantity;
}

function formatToCurrency(value) {
    value = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    return value;
}

function addToBasket(mealName) {
    const mealObj = meals.find(meal => meal.name == mealName);
    const basketMealObj = basket.find(element => element.name == mealObj.name);

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
    const basketMealObj = basket.find(element => element.name == mealName);

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
    const btnContentRef = document.getElementById('addBasketBtn-' + mealName);
    const divContentRef = document.getElementById('mealCardLeftBox-' + mealName);
    const basketMealObj = basket.find(element => element.name == mealName);

    if (basketMealObj != null) {
        renderMealCardSelected(btnContentRef, divContentRef, basketMealObj);
    } else {
        renderMealCardInitial(btnContentRef, divContentRef);
    }
}

function renderMealCardInitial(btnContentRef, divContentRef) {
    btnContentRef.innerText = 'Add to basket';
    btnContentRef.classList.remove('orangeFontColor');
    divContentRef.classList.remove('marginLeft');
}

function renderMealCardSelected(btnContentRef, divContentRef, basketMealObj) {
    btnContentRef.innerText = 'Added ' + basketMealObj.amount;
    btnContentRef.classList.add('orangeFontColor');
    divContentRef.classList.add('marginLeft');
}

function calculateBasket() {
    let subtotalAmount = 0;

    for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
        subtotalAmount += basket[basketIndex].amount * basket[basketIndex].price;
    }

    const totalAmount = subtotalAmount + deliveryFee;

    subtotalAmountContentRefs.forEach(element => element.innerText = formatToCurrency(subtotalAmount));
    deliveryAmountContentRefs.forEach(element => element.innerText = formatToCurrency(deliveryFee));
    totalAmountContentRefs.forEach(element => element.innerText = formatToCurrency(totalAmount));
    buyBtnTotalContentRefs.forEach(element => element.innerText = formatToCurrency(totalAmount));
}

function confirmOrder() {
    emptyBasket();
    toggleMobileBasket();
    confirmationDialogRef.showModal();

    setTimeout(() => {
        confirmationDialogRef.close();
    }, 2500);
}

function emptyBasket() {
    basket = [];
    renderBasket();
    renderMeals();
}

function closeConfirmationDialog() {
    confirmationDialogRef.close();
}

function toggleMobileBasket() {
    if (basketMobileRef.open) {
        basketMobileRef.close();
    } else {
        basketMobileRef.show();
    }

    basketBtnRef.classList.toggle('basketBtnActivated');
}