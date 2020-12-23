//UC19 to view Employee Payroll details from Local Storage.

//the innerHTML is populated by attaching a Listener to DOMContentLoaded event.

let empPayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    // document.querySelector(".emp-count").textContent = empPayrollList.length;
    let element = document.querySelector(".emp-count");
    if (element) {
        element.textContent = empPayrollList.length;
    }
    createInnerHtml();
    localStorage.removeItem("editEmp");
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem("EmployeePayrollList")
        ? JSON.parse(localStorage.getItem("EmployeePayrollList"))
        : [];
};

/*UC17 to view Employee Payroll details in a Tabular
Format from JS File using Template Literals. */

/* Template literals are enclosed by the backtick (` `) character
instead of double or single quotes.
* Template literals can contain placeholders. These are
indicated by the dollar sign and curly braces
*/
createInnerHtml = () => {
    if (empPayrollList.length == 0) return;
    const headerHtml = `<tr><th></th><th>Name</th><th>Gender</th><th>Department</th>
<th>Salary</th><th>start Date</th><th>Actions</th></tr>`;

    let innerHtml = `${headerHtml}`;
    for (const empPayrollData of empPayrollList) {
        innerHtml = `${innerHtml}
<tr>
<td><img src="${empPayrollData._profilePic
            }" class="profile" width="30px" alt=""></td>
<td>${empPayrollData._name}</td>
<td>${empPayrollData._gender}</td>
<td>${getDeptHtml(empPayrollData._department)}</td>
<td>${empPayrollData._salary}</td>
<td>${stringifyDate(empPayrollData._startDate)}</td>
<td>
<img id="${empPayrollData._id
            }" onclick="remove(this)" alt="delete" width="30px" src="../Assets/icons/delete-black-18dp.svg">
<img id="${empPayrollData._id
            }" onclick="update(this)" alt="edit" width="30px" src="../Assets/icons/create-black-18dp.svg ">
</td>
</tr>`;
    }
    document.querySelector("#display").innerHTML = innerHtml;
};

//UC18 to view Employee Payroll details in a Tabular Format from JSON Object.

//Display Employee Details from JSON Object including the Department
function getDeptHtml(deptList) {
    let deptHtml = "";
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`;
    }
    return deptHtml;
}

//UC20 to Remove an Employee from the Payroll details.
const remove = (node) => {
    let empPayrollData = empPayrollList.find((empData) => empData._id == node.id);
    if (!empPayrollData) return;
    const index = empPayrollList
        .map((empData) => empData._id)
        .indexOf(empPayrollData._id);
    empPayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
};

//UC21 to Update an Employee Payroll details.
const update = (node) => {
    
    let empPayrollData = empPayrollList.find(
        (empData) => (empData._id == node.id)
    );

    if (!empPayrollData) return;
    localStorage.setItem("editEmp", JSON.stringify(empPayrollData));
    window.location.replace(site_properties.add_emp_payroll_page);
};