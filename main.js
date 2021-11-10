console.log("hello");
let output = document.getElementById("output");

// hämta kurser
function getCourse() {
  output.innerHTML = "";
  fetch("http://localhost:5000/api/courses")
    .then((res) => res.json())
    .then((data) => {
      data.forEach(function (course) {
        console.log(course);
      });
    });
}

console.log(getCourse());
