'use strict';

function onLoadProfile(data) {
  document.querySelector('[data-name]').textContent = data.name;
  document.querySelector('[data-description]').textContent = data.description;
  document.querySelector('[data-pic]').src = data.pic;
  document.querySelector('[data-position]').textContent = data.position;

  return loadData(`https://neto-api.herokuapp.com/profile/${data.id}/technologies`)
}

function onLoadTechnologies(data) {
  document.querySelector('[data-technologies]').innerHTML = data.reduce((innerHTML, item) => {
    return innerHTML + `<span class="devicons devicons-${item}"></span>`
  }, '');

  document.querySelector('.content').style.display = 'initial';
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

loadData('https://neto-api.herokuapp.com/profile/me')
  .then(onLoadProfile)
  .then(onLoadTechnologies)
  .catch(onError);
