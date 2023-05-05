const URL =
  "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json";
const tableBody = document.querySelector("#table-body");
const searchButton = document.querySelector("#search-btn");
const ascendingOrderSortingFullname = document.querySelector("#A-Z-sorting");
const descendingOrderSortingFullname = document.querySelector("#Z-A-sorting");
const sortMarks = document.querySelector("#marks-sorting");
const sortPass = document.querySelector("#pass-sorting");
const sortClass = document.querySelector("#class-sorting");
const sortGender = document.querySelector("#gender-sorting");

fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    renderTable(data);
    return data;
  })
  .then((data) => {
    searchButton.addEventListener("click", () => {
      const searchInput = document.querySelector("#search-input").value;
      if (!searchInput) {
        alert("Please enter firstname / lastname / email to search.");
      } else {
        const filteredDataByFirstName = data.filter(
          (item) => item.first_name.toLowerCase() === searchInput.toLowerCase()
        );

        const filteredDataByLastName = data.filter(
          (item) => item.last_name.toLowerCase() === searchInput.toLowerCase()
        );

        const filteredDataByEmail = data.filter(
          (item) => item.email.toLowerCase() === searchInput.toLowerCase()
        );

        if (filteredDataByFirstName.length) {
          renderTable(filteredDataByFirstName);
        } else if (filteredDataByLastName.length) {
          renderTable(filteredDataByLastName);
        } else if (filteredDataByEmail.length) {
          renderTable(filteredDataByEmail);
        } else {
          tableBody.innerHTML =
            "<tr><td colspan='7'><h3 class='no-record-found'>No Record Found!</h3></tr></td>";
        }
      }
    });
    return data;
  })
  .then((data) => {
    ascendingOrderSortingFullname.addEventListener("click", () => {
      data.sort(compareByFullNameAscending);
      renderTable(data);
    });

    descendingOrderSortingFullname.addEventListener("click", () => {
      data.sort(compareByFullNameDescending);
      renderTable(data);
    });

    sortMarks.addEventListener("click", () => {
      data.sort(compareByMarks);
      renderTable(data);
    });

    sortPass.addEventListener("click", () => {
      const filteredDataByPass = data.filter((item) => item.passing);
      renderTable(filteredDataByPass);
    });

    sortClass.addEventListener("click", () => {
      data.sort(compareByPass);
      renderTable(data);
    });

    sortGender.addEventListener("click", () => {
      const filteredDataByMale = data.filter((item) => item.gender === "Male");
      renderTable(filteredDataByMale);

      createFemaleTable();
      const filteredDataByFemale = data.filter(
        (item) => item.gender === "Female"
      );
      renderFemaleTable(filteredDataByFemale);
    });
  })
  .catch((error) => console.error(error));

function renderTable(data) {
  tableBody.innerHTML = data
    .map(
      (item) => `
          <tr>
          <td>${item.id}</td>
          <td class="imgWithName"><img src="${
            item.img_src
          }" alt="std_img"></img> ${
        item.first_name + "  " + item.last_name
      }</td>
          <td>${item.gender}</td>
          <td>${item.class}</td>
          <td>${item.marks}</td>
          <td>${item.passing ? "Passed" : "Failed"}</td>
          <td>${item.email}</td>
        </tr>
        `
    )
    .join("");
}

function createFemaleTable(data) {
  const mainElement = document.querySelector("main");
  mainElement.innerHTML += `<table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Class</th>
        <th>Marks</th>
        <th>Passing</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody id="table-body-female">
    </tbody>
  </table>`;
}

function renderFemaleTable(data) {
  const tableBodyFemale = document.querySelector("#table-body-female");
  tableBodyFemale.innerHTML = data
    .map(
      (item) => `
            <tr>
            <td>${item.id}</td>
            <td class="imgWithName"><img src="${
              item.img_src
            }" alt="std_img"></img> ${
        item.first_name + "  " + item.last_name
      }</td>
            <td>${item.gender}</td>
            <td>${item.class}</td>
            <td>${item.marks}</td>
            <td>${item.passing ? "Passed" : "Failed"}</td>
            <td>${item.email}</td>
          </tr>
          `
    )
    .join("");
}

function compareByFullNameAscending(x, y) {
  let a = x.first_name.toUpperCase() + x.last_name.toUpperCase(),
    b = y.first_name.toUpperCase() + y.last_name.toUpperCase();
  return a == b ? 0 : a > b ? 1 : -1;
}

function compareByFullNameDescending(x, y) {
  let a = x.first_name.toUpperCase() + x.last_name.toUpperCase(),
    b = y.first_name.toUpperCase() + y.last_name.toUpperCase();
  return a == b ? 0 : a > b ? -1 : 1;
}

function compareByMarks(x, y) {
  return x.marks - y.marks;
}

function compareByPass(x, y) {
  return x.class - y.class;
}
