function renderMeals() {
    const contentRefs = [
        document.getElementById('burger'),
        document.getElementById('pizza'),
        document.getElementById('salad')
    ];

    for (let contentRefsIndex = 0; contentRefsIndex < contentRefs.length; contentRefsIndex++) {
        contentRefs[contentRefsIndex].innerHTML = '';

        const mealsFilter = meals.filter(meal => meal.category == contentRefs[contentRefsIndex].id);
        mealsFilter.forEach(meal => contentRefs[contentRefsIndex].innerHTML += getMealCardTemplate(meal));
    }
}

function renderBasket() {
    const contentRefs = [
        {
            empty: document.getElementById('basketDesktopEmpty'),
            filled: document.getElementById('basketDesktopFilled')
        },
        {
            empty: document.getElementById('basketMobileEmpty'),
            filled: document.getElementById('basketMobileFilled')
        }
    ];

    if (basket.length == 0) {
        contentRefs.forEach(element => renderEmptyBasket(element.empty, element.filled));
    } else {
        contentRefs.forEach(element => renderFilledBasket(element.empty, element.filled));
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

    const basketContentRefs = [
        document.getElementById('basketDesktopContent'),
        document.getElementById('basketMobileContent')
    ];

    basketContentRefs.forEach(element => element.innerHTML = '');

    for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
        if (basket[basketIndex].amount == 1) {
            basketContentRefs.forEach(element => element.innerHTML += getBasketItemTemplateQuantityOne(basket[basketIndex]));
        } else {
            basketContentRefs.forEach(element => element.innerHTML += getBasketItemTemplate(basket[basketIndex]));
        }
    }
}

function renderQuantityBadge() {
    const quantityBadgeContainerRef = document.getElementById('quantityBadgeContainer');
    const quantityBadgeRef = document.getElementById('quantityBadge');
    const basketBtnRef = document.getElementById('basketBtn');
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
    const dialogRef = document.getElementById('confirmationMessage');
    
    emptyBasket();
    dialogRef.showModal();

    setTimeout(() => {
        dialogRef.close();
    }, 2500);
}

function emptyBasket() {
    const basketRef = document.getElementById('basketScrollContainer');

    basketRef.classList.add('dNone');
    basket = [];
    renderBasket();
    renderMeals();
}

function closeConfirmationDialog() {
    const dialogRef = document.getElementById('confirmationMessage');

    dialogRef.close();
}

function toggleMobileBasket() {
    const basketRef = document.getElementById('basketMobile');
    const basketBtnRef = document.getElementById('basketBtn');

    if (basketRef.open) {
        basketRef.close();
    } else {
        basketRef.show();
    }

    basketBtnRef.classList.toggle('basketBtnActivated');
}