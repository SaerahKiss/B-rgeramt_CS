console.log(`hello`);

const h2resultJS = document.getElementsByClassName(`resultH2`);
const ergebnisJS = document.getElementsByClassName(`prozentzahl`);

//dann die buttons zugänglich machen
const jaButtons = Array.from(document.getElementsByClassName(`ja`));
//const jaButtons = Array.from(jaButtonshtml);
jaButtons.forEach((jaButton) => {
  jaButton.addEventListener("click", runfunctionsOnClick);
});

const neinButtons = Array.from(document.getElementsByClassName(`nein`));
neinButtons.forEach((neinButton) => {
  neinButton.addEventListener("click", clickFinish);
});

const rootJS = document.getElementsByClassName(`root`);

const buttonSkipIntroJS = document.getElementsByClassName(`Intro`);
const buttonSkipConclusionJS = document.getElementsByClassName(`Conclusion`);

//positionen für die buttons
const positionTopIntro = visualViewport.height * 4;
const positionTopConclusion = visualViewport.height * 19;

//alles was beim scrolling passieren soll
rootJS[0].addEventListener("scroll", (event) => {
  let distanceFromTop = rootJS[0].scrollTop;
  changeButtons(distanceFromTop);
  makeStickySections(distanceFromTop);
  //return distanceFromTop;
  //am besten mit case switch

  //if distanceFromTop < positionTopIntro {classList.add visibility zu skip button;

  //if distanceFromTop > positionTopIntro {classList.remove visibility von skip button;
  //classList.add visibility zu conclusions button}

  //if distanceFromTop > positionTopConclusion {classList.remove visibility von conclusion button;}
});

function changeButtons(distanceFromTop) {
  if (distanceFromTop < positionTopIntro) {
    buttonSkipIntroJS[0].classList.add(`visible`);
  } else if (distanceFromTop >= positionTopIntro) {
    buttonSkipIntroJS[0].classList.remove(`visible`);
    buttonSkipConclusionJS[0].classList.add(`visible`);
  }

  if (distanceFromTop >= positionTopConclusion) {
    buttonSkipConclusionJS[0].classList.remove(`visible`);
  }
}

//console.log(`viweport-Height:${visualViewport.height * 4}`);

//const stickyHeader = document.getElementsByClassName(`h2ToBesticky`);
//const stickySub = document.getElementsByClassName(`pToBesticky`);
const stickyH3 = document.getElementsByClassName(`stickyH3`);
const stickyBox = document.getElementsByClassName(`stickyBox`);

function startStickyScrolling() {
  //stickyHeader[0].classList.add(`stickyText`);
  //stickySub[0].classList.add(`stickyText`);
  stickyBox[0].classList.add(`stickyBoxIt`);
}

function noStickyScrolling() {
  //stickyHeader[0].classList.remove(`stickyText`);
  //stickySub[0].classList.remove(`stickyText`);
  stickyBox[0].classList.remove(`stickyBoxIt`);
}

function makeStickySections(distanceFromTop) {
  const positionTopStickySection = visualViewport.height * 12 - 85;
  const positionBottomStickyScrolling = visualViewport.height * 15 - 300;

  if (distanceFromTop < positionTopStickySection) {
    noStickyScrolling();
  } else if (distanceFromTop >= positionTopStickySection) {
    startStickyScrolling();
  }

  if (distanceFromTop > positionBottomStickyScrolling) {
    noStickyScrolling();
  }

  //fist grafik
  if (distanceFromTop <= visualViewport.height * 12) {
    stickyH3[0].innerText = `insgesamt: 100 Suchende:`;
  }
  if (distanceFromTop > visualViewport.height * 12) {
    stickyH3[0].innerText = `bei Besuch der Webseite\num 10:10 Uhr:`;
  }
  if (distanceFromTop > visualViewport.height * 14) {
    stickyH3[0].innerText = `bei Besuch der Webseite\nzu egal welcher Zeit:`;
  }
}

//console.log(buttonNEIN[0]); //test

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

let customProb = 0.0;

function clickFinish() {
  //h2resultJS[0].innerText = `[custom Text entsprechend dem, was geklickt wurde]${hours}:${minutes}`;
  //funktion spring zur nächsten section (smooth gescrollt am besten)
  //funktion versteckt den "skip into" button, lässt "conclusion" button erscheinen
  console.log(
    `das ist die nummer für die uhrzeitabhängige Zahl: ${caseNumbers}. Die Uhrzeit ist: ${hours}:${minutes}`
  );

  switch (caseNumbers) {
    case 0:
      h2resultJS[0].innerText = `Das ist die Wahrscheinlichkeit, mit der du jetzt (${hours}:${minutes}) freie Termine zu unbestimmter Zeit finden wirst.*`;
      break;
    case 1:
      h2resultJS[0].innerText = `Das ist die Wahrscheinlichkeit, mit der du jetzt (${hours}:${minutes}) freie Termine zu unbestimmter Zeit finden wirst.*`;
      break;
    case 2:
      h2resultJS[0].innerText = `Das ist die Wahrscheinlichkeit, mit der du jetzt (${hours}:${minutes}) freie Termine innerhalb der nächsten 14 Tage finden wirst.*`;
      break;
    case 3:
      h2resultJS[0].innerText = `Das ist die Wahrscheinlichkeit, mit der du jetzt (${hours}:${minutes}) freie Termine für den heutigen Tag finden wirst.*`;
      break;
  }
  getProbByCaseNumber(caseNumbers);
  console.log(askedProbCase);
  console.log(ProbNow);
  console.log(`customProb:${customProb}`);

  ergebnisJS[0].innerText = `${Math.floor(customProb * 100)}%`;
}

let currentTime = new Date();

let hours = currentTime.getHours();

let minutes = currentTime.getMinutes();
let roundedMinutes = Math.floor(minutes * 0.1) * 10;
let dataTime = `${hours}:${roundedMinutes || "00"}:00`;
//console.log(minutes);
//console.log(roundedMinutes);
console.log(dataTime);

// jaButtons[0].addEventListener("click", runfunctionsOnClick); //funktioniert nicht

//bei jedem klick -> add.eventlistener und der text (über class) ändert sich

function onClickFirst() {
  //funktion spring zur nächsten section (smooth gescrollt am besten)
  caseNumbers++;
  //console.log(
  //  `das ist die nummer für die uhrzeitabhängige Zahl: ${caseNumbers}`
  //);
}

function onClickTwice() {
  //funktion spring zur nächsten section (smooth gescrollt am besten)
  caseNumbers++;
  //console.log(
  //  `das ist die nummer für die uhrzeitabhängige Zahl: ${caseNumbers}`
  //);
}

//final click und dann ansicht der eigentlichen seite
function onClickThird() {
  //h2resultJS[0].innerText = `[custom Text entsprechend dem, was geklickt wurde]`;
  //funktion spring zur nächsten section (smooth gescrollt am besten)
  //funktion versteckt den "skip into" button, lässt "conclusion" button erscheinen
  caseNumbers++;
  console.log(
    `das ist die nummer für die uhrzeitabhängige Zahl: ${caseNumbers}`
  );

  switch (caseNumbers) {
    case 0:
      h2resultJS[0].innerText = `Das ist die Wahrscheinlichkeit, mit der du jetzt (${hours}:${minutes}) freie Termine zu unbestimmter Zeit finden wirst.*`;
      break;
    case 1:
      h2resultJS[0].innerText = `Das ist die Wahrscheinlichkeit, mit der du jetzt (${hours}:${minutes}) freie Termine zu unbestimmter Zeit finden wirst.*`;
      break;
    case 2:
      h2resultJS[0].innerText = `Das ist die Wahrscheinlichkeit, mit der du jetzt (${hours}:${minutes}) freie Termine innerhalb der nächsten 14 Tage finden wirst.*`;
      break;
    case 3:
      h2resultJS[0].innerText = `Das ist die Wahrscheinlichkeit, mit der du jetzt (${hours}:${minutes}) freie Termine für den heutigen Tag finden wirst.*`;
      break;
  }

  getProbByCaseNumber(caseNumbers);
  console.log(askedProbCase);
  //console.log(ProbNow);
  console.log(`customProb:${customProb}`);
  ergebnisJS[0].innerText = `${Math.floor(customProb * 100)}%`;
}

let askedProbCase = `anydayProb`;
function getProbByCaseNumber(caseNumber) {
  switch (caseNumber) {
    case 0:
      return (askedProbCase = `anydayProb`);
    case 1:
      return (askedProbCase = `anydayProb`);
    case 2:
      return (askedProbCase = `dateWithin14daysProb`);
    case 3:
      return (askedProbCase = `dateByTomorrowProb`);
  }
  console.log(
    `test für calculate Prob${calculateProbNow(data, dataTime, askedProbCase)}`
  );

  ergebnisJS[0].innerText = `${customProb * 100}%`;
}

let ProbNow = `iii`; //da sollte die wahrscheinlichkeit drin gespeichert werden...

function calculateProbNow(data, TimeNow, itemProperty) {
  const rightTime = data.find((pups) => getRightTime(pups, TimeNow));

  const rightProb = rightTime[itemProperty];
  return rightProb;
}

function getRightTime(data, TimeNow) {
  return data.Time === TimeNow;
}

//return fruit.name === "cherries";

//wandelt meine csv mit strings in eine array mit den passenden Chartwerden für 1 besonderes chart um
function dataItemToChartItem(dataItem) {
  return {
    x: dataItem.Time, //x achse
    y: `${parseFloat(dataItem.anydayProb) * 100}`, //y achse daten
  };
}

function secondDataItemToChartItem(dataItem) {
  return {
    x: dataItem.Time, //x achse
    y: [
      parseFloat(dataItem.dateByTomorrowProb) * 100,
      //parseFloat(dataItem.anydayProb),
    ], //y achse daten
  };
}

function thirdDataItemToChartItem(dataItem) {
  return {
    x: dataItem.Time,
    y: parseFloat(dataItem.dateWithin14daysProb) * 100,
  };
}

function drawLineChart(chartData, chartPosition) {
  const ctx = document.getElementById(chartPosition).getContext("2d");

  Chart.defaults.font.size = 14;
  Chart.defaults.elements.point.radius = 0;
  Chart.defaults.elements.point.borderWidth = 0;
  Chart.defaults.elements.point.hoverRadius = 5;
  Chart.defaults.elements.line.borderCapStyle = `round`;
  Chart.defaults.elements.line.tension = 0.1;
  Chart.defaults.font.color = "#ffffff";
  Chart.defaults.plugins.legend.display = false;
  Chart.defaults.plugins.tooltip.backgroundColor = `#ffffff`;
  Chart.defaults.plugins.tooltip.cornerRadius = 0;
  Chart.defaults.plugins.tooltip.bodyColor = `#000000`;
  Chart.defaults.plugins.tooltip.titleColor = `#000000`;
  Chart.defaults.plugins.tooltip.padding = 9;
  Chart.defaults.plugins.tooltip.boxPadding = 6;
  Chart.defaults.plugins.tooltip.position = `nearest`;
  //Chart.defaults.options.scales[x].grid.borderColor = `#000000`;
  //canvas.style.

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          data: chartData,
          backgroundColor: ["#000000"],
          borderColor: ["#000000"],
          borderWidth: 3,
        },
        /* {
          data: chartData,
          backgroundColor: ["#000000"],
          borderColor: ["#ffffff"],
          borderWidth: 3,
        },*/
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "",
        },

        /* tooltip: {
          callbacks: {
            afterTitle: `%`,
          },
        },*/
      },
      aspectRatio: 3,
      scales: {
        y: {
          min: 0,
          max: 100,

          title: {
            color: "#000000",
            display: true,
            text: "Prozent",
          },
          //tickColor: `#ffffff`,
          //color: `#ff00ff`,
        },
        x: {
          grid: {
            //display: false,
            drawOnChartArea: false,
            tickLength: 16,
            //tickColor: `#ffffff`,
          },
          title: {
            color: "#000000",
            display: true,
            text: "Uhrzeit",
          },
          text: `Uhrzeit`,
        },
      },
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
          backgroundColor: "#000000",
        },
      ],
    },
    options: {
      //ab hier funktioniert nix mehr
      responsive: true,
      //maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "",
        },
      },
      aspectRatio: 3,
      scales: {
        y: {
          //offset: false,
          min: 0,
          max: 1,
          //color: `#ff00ff`,
        },
        x: {
          grid: {
            //display: false,
            drawBorder: false,
            drawOnChartArea: false,
            //drawTicks: false,
            tickLength: 16,
          },
        },
      },
    },
  });
}

function drawLineChartTwoLines(
  chartData1,
  chartData2,
  chartData3,
  chartPosition
) {
  const ctx = document.getElementById(chartPosition).getContext("2d");

  Chart.defaults.font.size = 16;
  /*
  Chart.defaults.elements.point.radius = 0;
  Chart.defaults.elements.point.borderWidth = 0;
  Chart.defaults.elements.point.hoverRadius = 5;
  Chart.defaults.elements.line.borderCapStyle = `round`;
  Chart.defaults.elements.line.tension = 0.1;
  Chart.defaults.font.color = "#ffffff";
  Chart.defaults.plugins.legend.display = true;
  Chart.defaults.plugins.tooltip.backgroundColor = `#ffffff`;
  Chart.defaults.plugins.tooltip.cornerRadius = 0;
  Chart.defaults.plugins.tooltip.bodyColor = `#000000`;
  Chart.defaults.plugins.tooltip.titleColor = `#000000`;
  Chart.defaults.plugins.tooltip.padding = 9;
  Chart.defaults.plugins.tooltip.boxPadding = 6;
  Chart.defaults.plugins.tooltip.position = `nearest`;*/
  //Chart.defaults.options.scales[x].grid.borderColor = `#000000`;
  //canvas.style.

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "2 Tage",
          data: chartData1,
          backgroundColor: ["#000000"],
          borderColor: ["#000000"],
          borderWidth: 3,
        },
        {
          label: "14 Tage",
          data: chartData3,
          backgroundColor: ["rgba(255,255,255,0)"],
          borderColor: ["#DD7F7F"],
          borderWidth: 3,
          fill: true,
        },
        {
          label: "egal wann",
          data: chartData2,
          backgroundColor: ["rgba(255,255,255,1)"],
          borderColor: ["#466362"],
          borderWidth: 0,
          fill: true,
          borderDash: [8],
          borderDashOffset: [10],
        },
      ],
    },
    options: {
      interaction: {
        intersect: false,
        mode: "index",
      },
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "",
        },
        legend: {
          display: true,
          title: {
            text: `bla`,
          },
        },
        /* tooltip: {
          callbacks: {
            afterTitle: `%`,
          },
        },*/
      },
      aspectRatio: 3,
      scales: {
        y: {
          min: 0,
          max: 100,

          title: {
            color: "#000000",
            display: true,
            text: "Prozent",
          },
          //tickColor: `#ffffff`,
          //color: `#ff00ff`,
        },
        x: {
          grid: {
            //display: false,
            drawOnChartArea: false,
            tickLength: 16,
            //tickColor: `#ffffff`,
          },
          title: {
            color: "#000000",
            display: true,
            text: "Uhrzeit",
          },
          text: `Uhrzeit`,
        },
      },
    },
  });
}

function drawPolarChart(chartPosition) {
  const ctx = document.getElementById(chartPosition).getContext("2d");

  const myChart = new Chart(ctx, {
    type: "polarArea",
    data: {
      labels: [
        "heute",
        "in 3 Tagen",
        "in 7 Tagen",
        "in 14 Tagen",
        "in 30 Tagen",
        "im nächsten Monat",
      ],
      datasets: [
        {
          borderColor: `#EFF5DB`,
          label: "My First Dataset",
          data: [21, 5, 1, 1, 7, 66],
          backgroundColor: [
            "#466362",
            "#8E89BF",

            "#000000",
            "#000000",

            "#DF928E",
            "#000000",
          ],
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        r: {
          drawOnChartArea: false,
          display: false,
        },
      },
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
  const thirdChartdata = dataList.map(dataItemToChartItem);
  const anotherChartData = dataList.map(thirdDataItemToChartItem);
  drawLineChartTwoLines(
    secondChartData,
    thirdChartdata,
    anotherChartData,
    "mySecondChart"
  );

  const barChartData = dataList.reduce(groupDataByHours, {});
  drawBarChart(Object.values(barChartData), "myBarChart");

  //const polarChartData = [21, 5, 1, 1, 7, 66];
  drawPolarChart("myPolarChart");

  console.log(Object.values(barChartData));
}

d3.csv("Data1.csv").then((data) => {
  // Diese Funktion dauert ein wenig. Deshalb hast du außerhalb dieser Funktion keinen Zugriff auf die Daten.
  // Erst wenn das Auslesen aus der CSV abgeschloßen ist, kannst du damit was machen.

  // >>> schau in die Console. Da siehst du die Daten die du bekommst.
  // Daten sind ein Array von Objekten
  console.log(data);

  drawCharts(data);
  // hier function aufrufen um charts zu malen zb.

  // drawMyNiceChart(data)
  // oder zur Berechnung
  // getMedianTime(data)

  // mit D3 kannst du das relativ einfach machen:
  const median = d3.median(data, (d) => {
    return Number(d.anydayProb);
  });

  // ist das gleiche wie
  // const median = d3.median(data, d => Number(d.anyday))

  console.log(
    `test dateByTomorrowProb: ${calculateProbNow(
      data,
      dataTime,
      `dateByTomorrowProb`
    )}`
  );
  console.log(
    `test dateWithin14daysProb: ${calculateProbNow(
      data,
      dataTime,
      `dateWithin14daysProb`
    )}`
  );
  console.log(
    `test anydayProb: ${calculateProbNow(data, dataTime, `anydayProb`)}`
  );
  //console.log(median); //kommt von Gustav - was ist das? ein Durchschnitt?
  customProb = calculateProbNow(data, dataTime, askedProbCase);
  console.log(customProb); // hier muss askedProbCase rein, so funktioniert der wert!! muss nur noch eingebunden werden
});
// d3.csv("Data1.csv").then(
//   drawCharts,
//   calculateProbNow(askedProbCase, dataTime) //????
// );

/*d3.csv("Data1.csv").find(calculateProbNow(askedProbCase, dataTime));*/

//d3.csv("Data1.csv").then((d) => console.log(d));
/*
fetch("Buergeramt_appointment_experiment_sarah_2.csv", {
  mode: "no-cors",
})
  .then((response) => response.text())
  .then((data) => console.log(data));
  */
