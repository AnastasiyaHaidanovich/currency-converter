const select = document.getElementById("currency");
const select2 = document.getElementById("currency2");

const userValue = document.querySelector("label[for=userValue]");
const labelResult = document.querySelector("label[for=result]");

const userValueInput = document.getElementById("userValue");
const labelResultInput = document.getElementById("result");

const convertBtn = document.querySelector(".convert");

let nominalFrom, nominalTo, valueFrom, valueTo;

const addOptions = () => {
    return fetch ("https://www.cbr-xml-daily.ru/daily_json.js")
    .then(res => res.json())
    .then(data => {
        for (let key in data.Valute){
            let option = document.createElement("option");
            option.innerText = data.Valute[key].Name;
            option.setAttribute("data-char",data.Valute[key].CharCode);
            option.setAttribute("data-nominal",data.Valute[key].Nominal);
            option.setAttribute("data-value",data.Valute[key].Value);
            option.value = data.Valute[key].Value;
            select.appendChild(option);

            let option2 = document.createElement("option");
            option2.innerText = data.Valute[key].Name;
            option2.setAttribute("data-char",data.Valute[key].CharCode);
            option2.setAttribute("data-nominal",data.Valute[key].Nominal);
            option2.setAttribute("data-value",data.Valute[key].Value);
            option2.value = data.Valute[key].Value;
            select2.appendChild(option2);
            // [Сумма в валюте конвертации(2)]=[Сумма в валюте конвертации(1)]*
            // [Кратность(1)]*[Курс(2)]/[Кратность(2)]*[Курс(1)]
        }

        select.addEventListener('change', () => {
            select.querySelectorAll("option").forEach(option => {
                if(option.selected){
                    userValue.innerText =`${option.textContent}, (${option.dataset.char})`;
                    nominalFrom = option.dataset.nominal;
                    valueFrom = option.dataset.value;
                }
            });
        });
        
        select2.addEventListener('change', () => {
            select2.querySelectorAll("option").forEach(option => {
                if(option.selected){
                    labelResult.innerText =`${option.textContent}, (${option.dataset.char})`;
                    nominalTo = option.dataset.nominal;
                    valueTo = option.dataset.value;
                }
            });
        });
        
        convertBtn.addEventListener('click', (e) => {
            e.preventDefault();
            labelResultInput.value = "";
            labelResultInput.value = +valueFrom /+valueTo * +userValueInput.value * +nominalFrom / +nominalTo;
        });
    })
    .catch(error => {
        console.log(error);
    });
};
addOptions();

