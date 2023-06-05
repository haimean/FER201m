let listStudents =
  [
    {
      "id": 1,
      "name": "Nguyễn Văn An",
      "age": 25,
      "gender": "male"
    },
    {
      "id": 2,
      "name": "Trần Thị Bình",
      "age": 30,
      "gender": "female"
    },
    {
      "id": 3,
      "name": "Lê Hoàng Cước",
      "age": 40,
      "gender": "male"
    },
    {
      "id": 4,
      "name": "Phạm Thị Dịu",
      "age": 22,
      "gender": "female"
    },
    {
      "id": 5,
      "name": "Võ Thành An",
      "age": 28,
      "gender": "male"
    },
    {
      "id": 6,
      "name": "Đỗ Thị Diệu",
      "age": 35,
      "gender": "female"
    },
    {
      "id": 7,
      "name": "Nguyễn Văn Thành",
      "age": 50,
      "gender": "male"
    },
    {
      "id": 8,
      "name": "Hoàng Thị Hải",
      "age": 27,
      "gender": "female"
    },
    {
      "id": 9,
      "name": "Nguyễn Thành Nam",
      "age": 33,
      "gender": "male"
    },
    {
      "id": 10,
      "name": "Nguyễn Văn Kiên",
      "age": 26,
      "gender": "male"
    },
    {
      "id": 11,
      "name": "Nguyễn Ngọc Bách",
      "age": 17,
      "gender": "male"
    },
    {
      "id": 12,
      "name": "Nguyễn Thu Hiền",
      "age": 19,
      "gender": "female"
    }
  ]
const selectorId = document.getElementById("inputId");
const selectorName = document.getElementById("inputName");
const selectorAge = document.getElementById("inputAge");
const selectorGender = document.getElementsByName("inputGender");
const selectorDeleteId = document.getElementById("inputDeleteId");
const selectorDeleteName = document.getElementById("inputSearch");

const onSave = () => {
  if (checkedId()) {
    listStudents.push({
      "id": Number(selectorId.value),
      "name": selectorName.value,
      "age": Number(selectorAge.value),
      "gender": getSelectorGender()
    });
  }
  setDataTable(listStudents);
}

const onUpdate = () => {
  const data = listStudents.map((student) => {
    if (student.id === Number(selectorId.value)) {
      student.name = selectorName.value;
      student.age = Number(selectorAge.value);
      student.gender = getSelectorGender();
    }
    return student;
  })
  setDataTable(data);
}

const onDelete = () => {
  listStudents = listStudents.filter(item => {
    return item.id === Number(selectorDeleteId.value) ? false : true
  })
  setDataTable(listStudents);
}

const onSort = () => {
  const data = listStudents.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
  setDataTable(data);
}

const onSearch = () => {
  const data = listStudents.filter(item => {
    return item.name.includes(selectorDeleteName.value) ? item : null
  })
  setDataTable(data);
}

const checkedId = () => {
  listStudents.forEach(
    (item) => {
      if (item.id === Number(selectorId)) {
        return false
      }
    }
  )
  return true
}

const getFormData = (student) => {
  selectorId.value = student.id;
  selectorName.value = student.name;
  selectorAge.value = student.age;
  setSelectorGender(student.gender)
}

const setSelectorGender = (gender) => {
  for (i = 0; i < selectorGender.length; i++) {
    if (selectorGender[i].value === gender) {
      selectorGender[i].checked = true
    } else {
      selectorGender[i].checked = false
    }
  }
}

const getSelectorGender = () => {
  for (i = 0; i < selectorGender.length; i++) {
    if (selectorGender[i].checked == true) {
      return selectorGender[i].value;
    }
  }
}

const addRowHandlers = () => {
  var table = document.getElementById("body-table");
  var rows = table.getElementsByTagName("th");
  for (i = 0; i < rows.length; i++) {
    var currentRow = table.rows[i];
    var createClickHandler = function (row) {
      return function () {
        var cell = row.getElementsByTagName("th")[0];
        var id = Number(cell.innerHTML);
        const student = listStudents.find(item => item.id === id);
        getFormData(student);
      };
    };
    currentRow.onclick = createClickHandler(currentRow);
  }
}

const loadDataTable = (data) => {
  const table = document.querySelector('#body-table');
  data.map(item => {
    let tr = document.createElement('tr');
    tr = addSelectorTh(item.id, tr)
    tr = addSelectorTd(item.name, tr)
    tr = addSelectorTd(item.age, tr)
    tr = addSelectorTd(item.gender, tr)
    table.appendChild(tr);
  })
}

const addSelectorTd = (value, tr) => {
  const selector = document.createElement('td');
  selector.innerText = value
  tr.appendChild(selector)
  return tr
}

const setDataTable = (data) => {
  resetDataTable();
  loadDataTable(data)
  addRowHandlers();
}

const addSelectorTh = (value, tr) => {
  const selector = document.createElement('th');
  selector.innerText = value
  tr.appendChild(selector)
  return tr
}

const resetDataTable = () => {
  const table = document.querySelector('#body-table');
  table.innerHTML = '';
}


window.onload = setDataTable(listStudents)