console.log(`hello`);

const h1resultJS = document.getElementsByClassName(`resultH1`);

//dann die buttons zugänglich machen
const buttonJA = document.getElementsByClassName(`ja`);
//const buttonJA = Array.from(buttonJAhtml);
//console.log(buttonJA);

const buttonNEIN = document.getElementsByClassName(`nein`);
const rootJS = document.getElementsByClassName(`root`);

/*
//der versuch mit einem (jetzt gelöschten button zur nächsten section zur scollen)
const scrollElement = document.getElementsByClassName(`beginningOfWebsite`);
const scollVersuchButton =
  document.getElementsByClassName(`scollVersuchButton`);
scollVersuchButton.addEventListener("click", scrollToBeginning);
function scrollToBeginning() {
  beginningOfWebsite.scrollIntoView();
}*/

console.log(buttonNEIN[0]); //test

// Variable, nachdem die custon wahrscheinlichkeit ausgerechnet wird (wie oft "ja" gedrückt)
let caseNumbers = 0;

let count = 0;
function runfunctionsOnClick() {
  switch (count) {
    case 0:
      onClickFirst();
      break;
    case 1:
      onClickTwice();
      break;
    case 2:
      onClickThird();
      break;
  }
  count++;
}

function clickFinish() {
  h1resultJS[0].innerText = `[custom Text entsprechend dem, was geklickt wurde]`;
  //funktion spring zur nächsten section (smooth gescrollt am besten)
  //funktion versteckt den "skip into" button, lässt "conclusion" button erscheinen
  console.log(
    `das ist die nummer für die uhrzeitabhängige Zahl: ${caseNumbers}`
  );
}

buttonJA[0].addEventListener("click", runfunctionsOnClick); //funktioniert nicht
buttonNEIN[0].addEventListener("click", clickFinish);

//bei jedem klick -> add.eventlistener und der text (über class) ändert sich

function onClickFirst() {
  //funktion spring zur nächsten section (smooth gescrollt am besten)
  caseNumbers++;
}

function onClickTwice() {
  //funktion spring zur nächsten section (smooth gescrollt am besten)
  caseNumbers++;
}

//final click und dann ansicht der eigentlichen seite
function onClickThird() {
  h1resultJS[0].innerText = `[custom Text entsprechend dem, was geklickt wurde]`;
  //funktion spring zur nächsten section (smooth gescrollt am besten)
  //funktion versteckt den "skip into" button, lässt "conclusion" button erscheinen
  caseNumbers++;
  console.log(
    `das ist die nummer für die uhrzeitabhängige Zahl: ${caseNumbers}`
  );
}

//wandelt meine csv mit strings in eine array mit den passenden Chartwerden für 1 besonderes chart um
function dataItemToChartItem(dataItem) {
  return {
    x: dataItem.Time, //x achse
    y: parseFloat(dataItem.anydayProb), //y achse daten
  };
}

function secondDataItemToChartItem(dataItem) {
  return {
    x: dataItem.Time, //x achse
    y: parseFloat(dataItem.dateByTomorrowProb), //y achse daten
  };
}

function drawLineChart(chartData, chartPosition) {
  const ctx = document.getElementById(chartPosition).getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          data: chartData,
        },
      ],
    },
  });
}

function drawBarChart(chartData, chartPosition) {
  const ctx = document.getElementById(chartPosition).getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      datasets: [
        {
          data: chartData,
        },
      ],
    },
  });
}

function groupDataByHours(acc, item, idx) {
  const isNewGroup = idx % 3 === 0;
  const values = Object.values(acc);
  const itemValue = parseFloat(item.anydayProb);
  const lastHourKey = parseInt(Object.keys(acc)[values.length - 1], 10) || 0;
  if (isNewGroup) {
    acc[lastHourKey + 1] = {
      y: itemValue,
      x: `${item.Time}`,
      items: [item],
    };
    return acc;
  }
  acc[lastHourKey] = {
    y: (acc[lastHourKey].y + itemValue) / 2,
    x: acc[lastHourKey].x,
    items: [...acc[lastHourKey].items, item], //macht eig nix aber zeigt dass es funktioniert
  };
  return acc;
}

//hier kommt code von chart js zum styling ("dataList" is Array und "dataItem" ist das einzelne obj)
function drawCharts(dataList) {
  const chartData = dataList.map(dataItemToChartItem);
  drawLineChart(chartData, "myChart");

  const secondChartData = dataList.map(secondDataItemToChartItem);
  drawLineChart(secondChartData, "mySecondChart");

  const barChartData = dataList.reduce(groupDataByHours, {});
  drawBarChart(Object.values(barChartData), "myBarChart");

  console.log(Object.values(barChartData));
}

d3.csv("Data1.csv").then(drawCharts);

//d3.csv("Data1.csv").then((d) => console.log(d));
/*
fetch("Buergeramt_appointment_experiment_sarah_2.csv", {
  mode: "no-cors",
})
  .then((response) => response.text())
  .then((data) => console.log(data));
  */
