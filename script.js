function renderMeals() {
    let contentRef = [
        document.getElementById('burger'),
        document.getElementById('pizza'),
        document.getElementById('salad')
    ];

    for (let contentRefIndex = 0; contentRefIndex < contentRef.length; contentRefIndex++) {
        contentRef[contentRefIndex].innerHTML = '';

        const mealsFilter = meals.filter(meal => meal.category == contentRef[contentRefIndex].id);
        mealsFilter.forEach((meal) =>  {
            contentRef[contentRefIndex].innerHTML += getMealCardTemplate(meal);
        });
    };
}

function formatToCurrency(value){
    value = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
    return value;
}