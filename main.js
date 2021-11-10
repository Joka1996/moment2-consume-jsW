let output = document.getElementById("output");
// ladda listan
window.addEventListener("load", getCourses());
// hämta kurser
function getCourses() {
  //   output.innerHTML = "";
  fetch("http://localhost:5000/api/courses")
    .then((res) => res.json())
    .then((data) => {
      data.forEach(function (course) {
        console.log(course);
        output.innerHTML += `
        <tr>
            <td>${course.id}</td>
            <td>${course.courseId}</td>
            <td>${course.courseName}</td>
            <td>${course.coursePeriod}</td>
            <td><button onClick="deleteCourse(${course.id})">Radera</button></td>
        </tr>
        `;
      });
    });
}

// ta bort
function deleteCourse(id) {
  fetch("http://localhost:5000/api/courses?id=" + id, { method: "DELETE" })
    .then((res) => res.json())
    .then((data) => {
      getCourses();
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}
