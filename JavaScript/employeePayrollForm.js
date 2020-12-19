window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });


const year = document.getElementById('year')
    const month = document.getElementById('month')
    const day = document.getElementById('day')
    const dateError = document.querySelector('.date-error')
    year.addEventListener('change', function () {
        try {
            dateValidation()
        } catch (e) { dateError.textContent = e }
    });
    month.addEventListener('change', function () {
        try {
            dateValidation()
        } catch (e) { dateError.textContent = e }
    });
    day.addEventListener('change', function () {
        try {
            dateValidation()
        } catch (e) { dateError.textContent = e }
    });
    function dateValidation() {
        let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " +
            getInputValueById('#year')
        let newDate = Date.parse(date)
        let currDate = new Date()
        let miliDate = Date.parse(currDate) - 2592000000
        if (newDate < miliDate) {
            dateError.textContent = ""
            return
        } else throw 'Incorrect Date'
    }
});
//UC11 to create Employee Payroll Object On Save.

const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        alert(createEmployeePayroll());
        createAndUpdateStorage(employeePayrollData);
    } catch (e) {
        return;
    }
}

//uc11 Object creation continued
const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }

    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    //employeePayrollData.date = Date.parse(date);
    employeePayrollData.date = date;
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

//UC12 to save the Employee Payroll Object to Local Storage.

function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    console.log('printlist-',employeePayrollList);
    if (employeePayrollList != null) {

        employeePayrollList.push(employeePayrollData);

    } else {

        employeePayrollList = [employeePayrollData]
    }
    
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputElementValue = (id) => {
    let value = document.querySelector(id).value;
    return value;
}
/*
*1: querySelector is newer feature.
*2: the querySelector method can be used when selecting by element name, nesting, or class name
*3: querySelector lets you find elements with rules that cant be expressed with getElementById
*/
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

//UC13 to reset the form on clicking reset
const resetForm = () => {
    setValue('#name', ' ');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', ' ');
    setValue('#notes', ' ');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2020');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}