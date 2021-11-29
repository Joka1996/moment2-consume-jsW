// variabler
let output = document.getElementById("output");
let deleteBTN = document.getElementById("deleteBTN");
let updateOutput = document.getElementById("updateForm");

//variabler för att lägga till
let codeInput = document.getElementById("Kurskod");
let nameInput = document.getElementById("Kursnamn");
let planInput = document.getElementById("Kursplan");
let progInput = document.getElementById("Progression");
let termInput = document.getElementById("Termin");
let addBtn = document.getElementById("addBtn");

//variabler för uppdatering
let updateCode = document.getElementById("upKurskod");
let updateName = document.getElementById("upKursnamn");
let updatePlan = document.getElementById("upKursplan");
let updateProg = document.getElementById("upProgression");
let updateTerm = document.getElementById("upTermin");
let getId = document.getElementById("getId");
let upBtn = document.getElementById("upBtn");

// ladda listan från start.eventlyssnare
window.addEventListener("load", getCourses);
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addCourse();
});
upBtn.addEventListener("click", function (e) {
  e.preventDefault();
  updateCourse();
});

// hämta kurser
function getCourses() {
  fetch("http://localhost:5000/api/courses")
    .then((res) => res.json())
    .then((data) => {
      data.forEach(function (course) {
        //kontroll
        // console.log(course);
        //<td>${course._id}</td>
        output.innerHTML += ` 
        
            <td>${course.course_code}</td>
            <td>${course.course_name}</td>
            <td><a href="${course.course_plan}" target="_blank">Webblänk </td>
            <td>${course.progress}</td>
            <td>${course.term}</td>
            <td><button onClick="deleteCourse('${course._id}')" >Radera</button></td>
            <td><button onClick="sendToForm('${course._id}')"> <a href="#updateForm"> Uppdatera kurs</a> </button></td>
            <td><button onClick="reload()">Ladda om sidan</button></td>
        
        `;
      });
    });
}

// funktion för att ladda om sidan.
function reload() {
  location.reload();
  return false;
}

//lägg till
function addCourse() {
  //hämta inskickat värde
  let course_code = codeInput.value;
  let course_name = nameInput.value;
  let course_plan = planInput.value;
  let progress = progInput.value;
  let term = termInput.value;

  let course = {
    course_code: course_code,
    course_name: course_name,
    course_plan: course_plan,
    progress: progress,
    term: term,
  };

  fetch("http://localhost:5000/api/courses/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  })
    .then((res) => res.json())
    .then((data) => {
      //ladda om listan
      getCourses();
      codeInput.value = "";
      nameInput.value = "";
      planInput.value = "";
      progInput.value = "";
      termInput.value = "";
    })
    //eventuellt felmeddelande i konsolen
    .catch((error) => {
      console.log("Error: ", error);
    });
}

//uppdatera
function sendToForm(_id) {
  fetch("http://localhost:5000/api/courses/id=" + _id)
    .then((res) => res.json())
    .then((data) => {
      getId.value = data._id;
      updateCode.value = data.course_code;
      updateName.value = data.course_name;
      updatePlan.value = data.course_plan;
      updateProg.value = data.progress;
      updateTerm.value = data.term;
    });
}

function updateCourse() {
  let _id = getId.value;
  let course_code = updateCode.value;
  let course_name = updateName.value;
  let course_plan = updatePlan.value;
  let progress = updateProg.value;
  let term = updateTerm.value;

  let updateCourse = {
    course_code: course_code,
    course_name: course_name,
    course_plan: course_plan,
    progress: progress,
    term: term,
  };

  fetch("http://localhost:5000/api/courses/id=" + _id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateCourse),
  })
    .then((res) => res.json())
    .then((data) => {
      getCourses();
      getId.value = "";
      updateCode.value = "";
      updateName.value = "";
      updatePlan.value = "";
      updateProg.value = "";
      updateTerm.value = "";
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

// ta bort element
function deleteCourse(_id) {
  console.log(_id);
  fetch("http://localhost:5000/api/courses/id=" + _id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      // laddda om
      getCourses();
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}
