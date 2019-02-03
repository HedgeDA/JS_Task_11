'use strict';

function onLoadRecipe(data) {
  document.querySelector('[data-title]').textContent = data.title;
  document.querySelector('[data-pic]').style.backgroundImage = `url(${data.pic})`;
  document.querySelector('[data-ingredients]').textContent = data.ingredients.join(', ');

  return loadData(`https://neto-api.herokuapp.com/food/42/rating`)
}

function onLoadRating(data) {
  document.querySelector('[data-rating]').textContent = Math.round(data.rating * 100) / 100;
  document.querySelector('[data-star]').style.width = `${data.rating * 10}%`;
  document.querySelector('[data-votes]').textContent = `(${data.votes} оценок)`;

  return loadData(`https://neto-api.herokuapp.com/food/42/consumers`)
}

function onLoadConsumers(data) {
  let innerHTML = data.consumers.reduce((innerHTML, item) => {
    return innerHTML + `<img src="${item.pic}" title="${item.title}">`
  }, '');

  innerHTML += `<span>(+${data.total - 4})</span>`;

  document.querySelector('[data-consumers]').innerHTML = innerHTML;
}

function onError(event) {
  console.log(`Ошибка выполнения скрипта из url: ${event.target.src}`);
}

function loadData(url) {
  const functionName = `callback${String(Math.random()).slice(-7)}`;

  return new Promise((resolve, reject) => {
    window[functionName] = resolve;

    const script = document.createElement('script');
    script.src = `${url}?callback=${functionName}`;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

loadData('https://neto-api.herokuapp.com/food/42')
  .then(onLoadRecipe)
  .then(onLoadRating)
  .then(onLoadConsumers)
  .catch(onError);
