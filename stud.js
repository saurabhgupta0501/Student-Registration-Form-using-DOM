document.getElementById("studentForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the form values
  let name = document.getElementById("name").value;
  let studentId = document.getElementById("studentId").value;
  let email = document.getElementById("email").value;
  let contact = document.getElementById("contact").value;
  let editIndex = document.getElementById("editIndex").value;

  // Create a student object
  let student = {
      name: name,
      studentId: studentId,
      email: email,
      contact: contact
  };
  

  // Retrieve existing students from localStorage
  let students = JSON.parse(localStorage.getItem("students")) || [];

  // If editing an existing student
  if (editIndex !== "") {
      students[editIndex] = student;
      document.getElementById("editIndex").value = "";
  } else {
      // Add new student to the array
      students.push(student);
  }

  // Save the updated list of students back to localStorage
  localStorage.setItem("students", JSON.stringify(students));

  // Clear the form
  document.getElementById("studentForm").reset();

  // Display the updated students table
  displayStudents();
});

// Function to display the students in the table
function displayStudents() {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  let tableBody = document.querySelector("#studentsTable tbody");
  tableBody.innerHTML = ""; // Clear the table before displaying

  students.forEach(function(student, index) {
      let row = document.createElement("tr");

      let cellName = document.createElement("td");
      cellName.textContent = student.name;
      row.appendChild(cellName);

      let cellStudentId = document.createElement("td");
      cellStudentId.textContent = student.studentId;
      row.appendChild(cellStudentId);

      let cellEmail = document.createElement("td");
      cellEmail.textContent = student.email;
      row.appendChild(cellEmail);

      let cellContact = document.createElement("td");
      cellContact.textContent = student.contact;
      row.appendChild(cellContact);

      let cellActions = document.createElement("td");

      // Edit button
      let editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add("edit");
      editButton.addEventListener("click", function() {
          editStudent(index);
      });

      // Delete button
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete");
      deleteButton.addEventListener("click", function() {
          deleteStudent(index);
      });

      cellActions.appendChild(editButton);
      cellActions.appendChild(deleteButton);

      row.appendChild(cellActions);
      tableBody.appendChild(row);
  });
}

// Function to edit a student's data
function editStudent(index) {
  let students = JSON.parse(localStorage.getItem("students"));
  let student = students[index];

  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;

  // Set the edit index to modify the existing entry
  document.getElementById("editIndex").value = index;
}

// Function to delete a student's data
function deleteStudent(index) {
  let students = JSON.parse(localStorage.getItem("students"));
  students.splice(index, 1); // Remove the student at the specified index
  localStorage.setItem("students", JSON.stringify(students));

  // Refresh the table after deletion
  displayStudents();
}

// Display the students when the page loads
window.onload = function() {
  displayStudents();
};
