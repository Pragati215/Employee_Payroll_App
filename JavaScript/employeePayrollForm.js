let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener("DOMContentLoaded", (event) => {
    const name = document.querySelector("#name");
    const textError = document.querySelector(".text-error");
    name.addEventListener("input", function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            new EmployeePayrollData().name = name.value;
            // console.log("name-" + name);
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector("#salary");
    const output = document.querySelector(".salary-output");
    output.textContent = salary.value;
    salary.addEventListener("input", function () {
        output.textContent = salary.value;
    });

    const date = document.querySelector("#date");
    date.addEventListener("input", function () {
        const startDate = new Date(
            Date.parse(
                getInputValueById("#day") +
                " " +
                getInputValueById("#month") +
                " " +
                getInputValueById("#year")
            )
        );
        try {
            new EmployeePayrollData().startDate = startDate;
            setTextValue(".date-error", "");
        } catch (e) {
            setTextValue(".date-error", e);
        }
    });

    checkForUpdate();
});
//UC11 to create Employee Payroll Object On Save.

const save = (event) => {
    // To be invoked in case the DOM event listener fails to validate the date or name
    event.preventDefault();
    // To stop the form submission in case validation fails
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        alert(createEmployeePayrollData());
        resetForm();
        // Once the data is save moving to the home page to see the data directly
        // Note that this does not mean our home button is redundant
        window.location.replace(site_properties.home_page);
        //let employeePayrollData = createEmployeePayroll();

        //createAndUpdateStorage(employeePayrollData);
    } catch (e) {
        return;
    }
};

/**
* Now we are not working on local instance as we had the requirement of data to be pre-declared
*/
const setEmployeePayrollObject = () => {
    employeePayrollObj._name = getInputValueById("#name");
    employeePayrollObj._profilePic = getSelectedValues("[name=profile]").pop();
    employeePayrollObj._gender = getSelectedValues("[name=gender]").pop();
    employeePayrollObj._department = getSelectedValues("[name=department]");
    employeePayrollObj._salary = getInputValueById("#salary");
    employeePayrollObj._note = getInputValueById("#notes");
    //employeePayrollObj._id = "1";
    //employeePayrollObj._id = Date.parse(new Date());
   // employeePayrollObj._id = getInputValueById('#id');
    let date =
        getInputValueById("#day") +
        " " +
        getInputValueById("#month") +
        " " +
        getInputValueById("#year");
    employeePayrollObj._startDate = date;
};
//UC12 to save the Employee Payroll Object to Local Storage.

function createAndUpdateStorage() {
    let employeePayrollList = JSON.parse(
        localStorage.getItem("EmployeePayrollList")
    );
    console.log("printlist-", employeePayrollList);

    // If the employeePayrollData list is not empty i.e. already created then push the incoming data onto the local storage
    if (employeePayrollList) {
        let empPayrollData = employeePayrollList.find(
            (empData) => empData._id == employeePayrollObj._id
        );
        if (!empPayrollData) {
            employeePayrollList.push(createEmployeePayrollData());
        } else {
            // Using map array helper function to mention the instance with the identified node id
            // Getting the index of the element using index array helper function
            const index = employeePayrollList
                .map((empData) => empData._id)
                .indexOf(empPayrollData._id);
            // Removing the element from the list once update request is passed
            employeePayrollList.splice(
                index,
                1,
                createEmployeePayrollData(empPayrollData._id));
        }
    } else {
        employeePayrollList = [createEmployeePayrollData()];
    }
    // Displaying the alert popup for the user one more time before the local storage has been populated
    // alert(employeePayrollList.toString());
    // Push the data to the local storage
    localStorage.setItem(
        "EmployeePayrollList",
        JSON.stringify(employeePayrollList)
    );
}

//uc11 Object creation continued
const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if (!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
    // try {
    // employeePayrollData.name = getInputValueById('#name');
    // } catch (e) {
    // setTextValue('.text-error', e);
    // throw e;
    // }

    // employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    // employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    // employeePayrollData.department = getSelectedValues('[name=department]');
    // employeePayrollData.salary = getInputValueById('#salary');
    // employeePayrollData.note = getInputValueById('#notes');
    // let currdate = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    // employeePayrollData.startDate = currdate;
    // employeePayrollData.id = Date.parse(new Date());
    // //employeePayrollData.date = Date.parse(date);
    // //employeePayrollData.startDate = date;
    // alert(employeePayrollData.toString());
    // return employeePayrollData;
};

/**
*
@param {} employeePayrollData
*/
const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = employeePayrollObj._name;
    } catch (e) {
        setTextValue(".name-error", e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    employeePayrollData.id = Date.parse(new Date());
    try {
        employeePayrollData.startDate = new Date(
            Date.parse(employeePayrollObj._startDate)
        );
    } catch (e) {
        setTextValue(".date-error", e);
        throw e;
    }
    alert(employeePayrollData.toString());
};
const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
};

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach((item) => {
        if (item.checked) selItems.push(item.value);
    });
    return selItems;
};

const getInputElementValue = (id) => {
    let value = document.querySelector(id).value;
    return value;
};
/*
*1: querySelector is newer feature.
*2: the querySelector method can be used when selecting by element name, nesting, or class name
*3: querySelector lets you find elements with rules that cant be expressed with getElementById
*/
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
};

//UC21 to Update an Employee Payroll details.
const setForm = () => {
    setValue("#name", employeePayrollObj._name);
    setSelectedValues("[name=profile]", employeePayrollObj._profilePic);
    setSelectedValues("[name=gender]", employeePayrollObj._gender);
    setSelectedValues("[name=department]", employeePayrollObj._department);
    setValue("#salary", employeePayrollObj._salary);
    setTextValue(".salary-output", employeePayrollObj._salary);
    setValue("#notes", employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue("#day", date[0]);
    setValue("#month", date[1]);
    setValue("#year", date[2]);
};

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach((item) => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value === value) item.checked = true;
    });
};
//UC13 to reset the form on clicking reset
const resetForm = () => {
    setValue("#name", " ");
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    setValue("#salary", " ");
    setValue("#notes", " ");
    setSelectedIndex("#day", 0);
    setSelectedIndex("#month", 0);
    setSelectedIndex("#year", 0);
};

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach((item) => {
        item.checked = false;
    });
};
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
};

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
};

//UC21 to Update an Employee Payroll details.

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
};

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem("editEmp");
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
};