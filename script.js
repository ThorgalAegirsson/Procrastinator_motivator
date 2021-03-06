(() => {
    'use strict';
    const formatTime = (lifetime) => {
        const years = Math.floor(lifetime);
        const extraWeeks = lifetime - years;
        const weeks = Math.round(extraWeeks * 52);
        let textOutput = `${years} years`;
        if (weeks) textOutput += ` ${weeks} weeks`;
        return textOutput;
    };

    const drawChart = (lifetime, timePassed) => {
        const chartDiv = document.querySelector('div.chart');
        chartDiv.innerHTML = '';
        const weeks = Math.round(lifetime * 52);
        const pastWeeks = Math.round(timePassed * 52);
        for (let i = 0; i < weeks; i++){
            const weekDiv = document.createElement('div');
            weekDiv.classList.add('weekDiv');
            if (i < pastWeeks) weekDiv.classList.add('passed');
            chartDiv.appendChild(weekDiv);
        }

    };
    const openModal = (className, yearVal) => {
        const modal = document.querySelector(`.${className}`);
        modal.classList.add('show');
        const modalBtn = document.querySelector('.modal button');
        const calculateProgressive = (e) => {
            e.preventDefault();
            document.querySelector('.chartWrapper').classList.remove('invisible');
            document.querySelector('#gender').getElementsByTagName('option')[1].selected = 'selected';
            calculate(yearVal, 'woman');
            modalBtn.removeEventListener('click', calculateProgressive);
            modal.classList.remove('show');
        }
        modalBtn.addEventListener('click', calculateProgressive);
    }
    const readData = (year, gender) => {
        let yearVal = year.options[year.selectedIndex].value;
        let genderVal = gender.options[gender.selectedIndex].value;
        if (genderVal === 'idiot') {
            openModal('modalWrapper', yearVal);
        } else {
            calculate(yearVal, genderVal);
        }
    };

    const calculate = (year, gender) => {
        const output = document.querySelector('.output');
        const lifetime = document.querySelector('.lifetime');
        const lifeLeft = document.querySelector('.lifeLeft');
        const genderStr = 'SP.DYN.LE00.IN'; //both genders, unused
        const maleStr = `SP.DYN.LE00.MA.IN`;
        const femaleStr = `SP.DYN.LE00.FE.IN`;
        const rootURL = `https://api.worldbank.org/v2/countries/POL/indicators/${gender === 'man' ? maleStr : femaleStr}?date=${year}:${year}&format=json`;
        fetch(rootURL).then((res) => res.json(), (err) => console.error(err)).then((json) => {
            const life = json[1][0].value;
            lifetime.textContent = formatTime(life);
            const today = new Date().getFullYear();
            const timePassed = today - year;
            lifeLeft.textContent = formatTime(life - timePassed);
            drawChart(life, timePassed);
            document.querySelector('.chartWrapper').classList.remove('invisible');
        });
    };

    const init = () => {
        //references
        const yearBox = document.querySelector('#year');
        const startBtn = document.querySelector('.submit');
        const gender = document.querySelector('#gender');
        
        //populate website
        for (let i = 2016; i > 1959; i--){
            const option = document.createElement('option');
            option.setAttribute('value', i);
            option.textContent = i;
            yearBox.appendChild(option);
        }

        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            readData(year, gender);
        });
    };

    document.addEventListener('DOMContentLoaded', init, false);
})();