//UC19 to view Employee Payroll details from Local Storage.
   
//the innerHTML is populated by attaching a Listener to DOMContentLoaded event.

let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
}
);
const getEmployeePayrollDataFromStorage = () => {
    let employeePayrollList = createEmployeePayrollJSON();
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

 /*UC17 to view Employee Payroll details in a Tabular
Format from JS File using Template Literals. */ 

   /* Template literals are enclosed by the backtick (` `) character
       instead of double or single quotes.
    *  Template literals can contain placeholders. These are
       indicated by the dollar sign and curly braces 
   */
  createInnerHtml = () => {
       if (empPayrollList.length == 0) return;
       const headerHtml = `<tr><th></th><th>Name</th><th>Gender</th><th>Department</th>
           <th>Salary</th><th>start Date</th><th>Actions</th></tr>`
       let innerHtml = `${headerHtml}`
       for (const empPayrollData of empPayrollList) {
           innerHtml = `${innerHtml}
           <tr>
           <td><img src="${empPayrollData._profilePic}" class="profile" width="30px" alt=""></td>
           <td>${empPayrollData._name}</td>
           <td>${empPayrollData._gender}</td>
           <td>${getDeptHtml(empPayrollData._department)}</td>
           <td>${empPayrollData._salary}</td>
           <td>${empPayrollData._startDate}</td>
           <td>
               <img id="1" name="${empPayrollData._id}" onclick="remove(this)" alt="delete" width="30px" src="../Assets/icons/delete-black-18dp.svg">
               <img id="1" name="${empPayrollData._id}" onclick="update(this)" alt="edit" width="30px" src="../Assets/icons/create-black-18dp.svg  ">
           </td>
       </tr>`
       }
       document.querySelector('#display').innerHTML = innerHtml
   }

//UC18 to view Employee Payroll details in a Tabular Format from JSON Object.

   const createEmployeePayrollJSON = () => {
       let empPayrollListLocal = [
           {
               _name: 'Mohan Roy',
               _gender: 'male',
               _department: [
                   'Engineering', 'Hr'
               ],
               _salary: '400000',
               _startDate: '21 May 2019',
               _note: '',
               _id: new Date().getTime(),
               _profilePic: '../Assets/profile-images/image2.png'
           },
           {
               _profilePic: '../Assets/profile-images/image1.png',
               _name: 'Monika choudhary',
               _gender: 'female',
               _department: [
                   'Hr', 'Sale'
               ],
               _salary: '200000',
               _startDate: '20 Feb 2020',
               _note: '',
               _id: new Date().getTime(),
   
           }
       ]
       return empPayrollListLocal
   }

   //Display Employee Details from JSON Object including the Department
   function getDeptHtml(deptList) {
       let deptHtml = ''
       for (const dept of deptList) {
           deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
       }
       return deptHtml
   }