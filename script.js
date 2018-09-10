(() => {
    'use strict';
    const getData = () => {
        console.log('fetch started');
        const output = document.querySelector('.output');
        const gender = 'SP.DYN.LE00.IN'; //general
        const male = `SP.DYN.LE00.MA.IN`;
        const female = `SP.DYN.LE00.FE.IN`;

        // const gender = 'SPODYNLE00MAIN';
        const variableURL = `countries/POL/indicators/${female}`;
        const rootURL = `https://api.worldbank.org/v2/${variableURL}?date=1960:2007&format=json`;
        fetch(rootURL).then((res) => res.json(), (err) => console.error(err)).then((json) => {
            console.log('final step');
            console.log(json);
            output.textContent = JSON.stringify(json);
        });
    };
    const init = () => {
        console.log('app started');
        const dataBtn = document.querySelector('button.data');
        dataBtn.addEventListener('click', getData, false);
    };

    document.addEventListener('DOMContentLoaded', init, false);
})();