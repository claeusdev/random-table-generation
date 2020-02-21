let timer;

const UI = {
  loadData(data) {
    let tableReference = document
      .getElementsByClassName("table")[0]
      .getElementsByTagName("tbody")[0];

    while (tableReference.hasChildNodes()) {
      tableReference.removeChild(tableReference.firstChild);
    }

    for (item in TABLE_DATA) {
      const newRow = tableReference.insertRow(tableReference.rows.length);
      let idCell = newRow.insertCell(0);
      let imageCell = newRow.insertCell(1);
      let nameCell = newRow.insertCell(2);
      let priceCell = newRow.insertCell(3);

      let img = document.createElement("img");
      img.src = data[item].thumbnailUrl;

      let id = document.createTextNode(data[item].id);
      let name = document.createTextNode(data[item].name);
      let price = document.createTextNode(data[item].price);

      idCell.appendChild(id);
      imageCell.appendChild(img);
      nameCell.appendChild(name);
      priceCell.appendChild(price);
    }
  },
  shuffle(array) {
    var counter = array.length;

    while (counter > 0) {
      var index = Math.floor(Math.random() * counter);

      counter--;

      var temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  },
  init() {
    let startButton = document.getElementById("start");
    let stopButton = document.getElementById("stop");
    let sortButton = document.getElementById("sort");

    startButton.onclick = event => {
      event.stopImmediatePropagation();
      startButton.disabled = true;

      const getRandomData = () => {
        let shuffledData = this.shuffle(TABLE_DATA);
        this.loadData(shuffledData);
      };
      timer = setInterval(getRandomData, 500);
    };

    stopButton.onclick = () => {
      startButton.disabled = false;
      clearInterval(timer);
    };

    sortButton.onclick = () => {
      let sortedData = TABLE_DATA.sortAscBy("id");
      sortedData = sortedData.sortDescBy("price");
      this.loadData(sortedData);
    };
  }
};

Array.prototype.sortAscBy = function(p) {
  return this.slice(0).sort((a, b) => {
    let x = parseInt(a[p]);
    let y = parseInt(b[p]);

    if (x > y) {
      return 1;
    } else if (x < y) {
      return -1;
    } else {
      return 0;
    }
  });
};

Array.prototype.sortDescBy = function(p) {
  return this.slice(0).sort((a, b) => {
    let x = parseInt(a[p]);
    let y = parseInt(b[p]);

    if (x > y) {
      return -1;
    } else if (x < y) {
      return 1;
    } else {
      return 0;
    }
  });
};
document.addEventListener("DOMContentLoaded", UI.init(), false);
