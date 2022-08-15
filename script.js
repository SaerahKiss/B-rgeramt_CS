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

const rootJS = document.getElementById(`scroller`);

// Utility to get a function that adds the top of an element relative to top of the viewport to the already scrolled distance
const getTopGetter = (distanceFromTop) => (el) =>
  el.getBoundingClientRect().top + distanceFromTop;

function changeButtons(distanceFromTop) {
  const getTop = getTopGetter(distanceFromTop); // getTopGetter ist eine Factory-Funktion die uns eine neue Funktion returnt, welche die Höhe eines Element + distanceFromTop returnt.

  // Save button elements into variables
  const buttonSkipIntroJS = document.querySelector(`.Intro`);
  const buttonSkipConclusionJS = document.querySelector(`.Conclusion`);

  // Save section elements into variables
  const startSectionEl = document.getElementById("0");
  const introSectionEl = document.querySelector(".first");
  const conclusionSectionEl = document.getElementById("10");

  // Save the top position of each section into variables
  const topOfStart = getTop(startSectionEl);
  const topOfIntro = getTop(introSectionEl);
  const topOfConclusion = getTop(conclusionSectionEl);

  // Check if skip-intro button should be shown
  if (distanceFromTop > topOfStart && distanceFromTop < topOfIntro) {
    buttonSkipIntroJS.classList.add(`visible`);
  } else {
    buttonSkipIntroJS.classList.remove(`visible`);
  }

  // Check if skip-to-conclusion button should be shown
  if (distanceFromTop > topOfIntro && distanceFromTop < topOfConclusion) {
    buttonSkipConclusionJS.classList.add(`visible`);
  } else {
    buttonSkipConclusionJS.classList.remove(`visible`);
  }
}

//const stickyHeader = document.getElementsByClassName(`h2ToBesticky`);
//const stickySub = document.getElementsByClassName(`pToBesticky`);
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

const getElBB = (el) => el.getBoundingClientRect();

function makeStickySections(distanceFromTop) {
  const getTop = getTopGetter(distanceFromTop);

  // Save section elements into variables
  const slide1 = document.getElementById("61");
  const slide2 = document.getElementById("62");
  const slide3 = document.getElementById("63");
  const lastSlide = document.getElementById("64");

  // Save the scroll positions at which to start and end the sticky behavior
  const heightOfTextContent = slide1
    .querySelector("div:first-of-type")
    .getBoundingClientRect().height;
  const stickyPositionStart = getTop(slide1);
  const stickyPositionEnd = getTop(lastSlide) - heightOfTextContent;

  // If within the start and end position -> Sticky. Else not.
  if (
    distanceFromTop >= stickyPositionStart &&
    distanceFromTop <= stickyPositionEnd
  ) {
    startStickyScrolling();
  } else {
    noStickyScrolling();
  }

  // Save a reference to the sticky H3 in a variable
  const stickyH3 = document.querySelector(`.stickyH3`);

  // Save an offset to change the content before
  // it is perfectly aligned to the top of the section
  const changeH3ContentOffset = 200;

  // If the scrolled distance is smaller than the top of slide 2 (- the offset)
  if (distanceFromTop <= getTop(slide2) - changeH3ContentOffset) {
    stickyH3.innerText = `insgesamt: 100 Suchende:`;
  }
  // If the scrolled distance is between the top of slide 2 AND the top of slide 3 (- the offset)
  else if (
    distanceFromTop > getTop(slide2) - changeH3ContentOffset &&
    distanceFromTop <= getTop(slide3) - changeH3ContentOffset
  ) {
    stickyH3.innerText = `bei Besuch der Webseite\num 10:10 Uhr:`;
  }
  // If the scrolled distance is bigger than the top of slide 3 (- the offset)
  else if (distanceFromTop > getTop(slide3) - changeH3ContentOffset) {
    stickyH3.innerText = `bei Besuch der Webseite\nzu egal welcher Zeit:`;
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
  // console.log(askedProbCase);
  // console.log(ProbNow);
  // console.log(`customProb:${customProb}`);

  if (askedProbCase === `dateWithin14daysProb`) {
    ergebnisJS[0].innerText = `${Math.floor(twoWeeksProb * 100)}%`;
  } else if (askedProbCase === `dateByTomorrowProb`) {
    ergebnisJS[0].innerText = `${Math.floor(tomorrowProb * 100)}%`;
  } else if (askedProbCase === `anydayProb`) {
    ergebnisJS[0].innerText = `${Math.floor(customProb * 100)}%`;
  }

  //ergebnisJS[0].innerText = `${Math.floor(customProb * 100)}%`;
}

let currentTime = new Date();

let hours = currentTime.getHours();

let minutes = currentTime.getMinutes();
let roundedMinutes = Math.floor(minutes * 0.1) * 10;

let dataTime = `${hours}:${roundedMinutes || "00"}:00`;
//console.log(minutes);
//console.log(roundedMinutes);

if (minutes < 10) {
  minutes = "0" + minutes;
}

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
  // console.log(askedProbCase);
  //console.log(ProbNow);
  // console.log(`customProb:${customProb}`);

  if (askedProbCase === `dateWithin14daysProb`) {
    ergebnisJS[0].innerText = `${Math.floor(twoWeeksProb * 100)}%`;
  } else if (askedProbCase === `dateByTomorrowProb`) {
    ergebnisJS[0].innerText = `${Math.floor(tomorrowProb * 100)}%`;
  } else if (askedProbCase === `anydayProb`) {
    ergebnisJS[0].innerText = `${Math.floor(customProb * 100)}%`;
  }

  //ergebnisJS[0].innerText = `${Math.floor(customProb * 100)}%`;
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
  // console.log(
  //   `test für calculate Prob${calculateProbNow(data, dataTime, askedProbCase)}`
  // );

  //ergebnisJS[0].innerText = `${customProb * 100}%`;
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

  return new Chart(ctx, {
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
          title: {
            color: "#000000",
            display: true,
            text: "Prozent",
          },
        },
        x: {
          grid: {
            //display: false,
            drawBorder: false,
            drawOnChartArea: false,
            //drawTicks: false,
            tickLength: 16,
          },
          title: {
            color: "#000000",
            display: true,
            text: "Uhrzeit",
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
          backgroundColor: ["#00000000"],
          borderColor: ["#102575"],
          borderWidth: 3,
        },
        {
          label: "14 Tage",
          data: chartData3,
          backgroundColor: ["rgba(255,255,255,0)"],
          borderColor: ["#C4352B"],
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
        "% heute",
        "% in 3 Tagen",
        "% in 7 Tagen",
        "% in 14 Tagen",
        "% in 30 Tagen",
        "% im nächsten Monat",
      ],
      datasets: [
        {
          borderColor: `#EFF5DB`,
          label: "My First Dataset",
          data: [21, 5, 1, 1, 7, 66],
          backgroundColor: [
            "#C4352B",
            "#102575",

            "#107564",
            "#803333",

            "#C4B12B",
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

//number für zeitspannen (6 entspricht 1h)
//einheit für barChartTimespan je nach Index der timeSwitchButtonsJS? eg: 0 = 12h, 1=6h, 2=3h, usw.

/* Problem: die d3 funktion wird nur 1 mal am anfang geladen, beim späteren ändern von let z.B. durch 
klicken auf einen Button wird das bar chart nicht mehr geändert bzw.
gibt es enen weg, mit dem ich im späteren verlauf das bar chart neu laden kann? 
dafür muss die function drawCharts neu geladen werden
gibt es einen weg NUR das bar chart neu zu laden nicht alle anderen charts?*/

function groupDataByHours(acc, item, idx, barChartTimespan) {
  const isNewGroup = idx % barChartTimespan === 0;
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
  let barChartTimespan = 3;
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

  const getDataByTimeReducer = (acc, item, idx) => {
    return groupDataByHours(acc, item, idx, barChartTimespan);
  };

  const barChartData = dataList.reduce(getDataByTimeReducer, {});
  const barChart = drawBarChart(Object.values(barChartData), "myBarChart");

  const timeSwitchButtonsJS = Array.from(
    document.getElementsByClassName(`timeSwitchButton`)
  );

  //const jaButtons = Array.from(jaButtonshtml);
  timeSwitchButtonsJS.forEach((switchButton) => {
    switchButton.addEventListener("click", changeBarChart);
  });

  // console.log(`buttons: ${timeSwitchButtonsJS}`);

  function changeBarChart(evt) {
    barChartTimespan = parseInt(evt.target.dataset.timespan, 10);

    const newData = Object.values(dataList.reduce(getDataByTimeReducer, {}));
    barChart.data.datasets[0].data = newData;
    barChart.data.labels = newData.map((i) => i.x);
    barChart.update();

    timeSwitchButtonsJS.forEach((element) => {
      element.classList.remove(`active`);
    });

    evt.target.classList.add(`active`);

    // console.log(`barChartTimespan: ${barChartTimespan}`);
  } //---- barChartTimespan je nach button mögl?

  //const polarChartData = [21, 5, 1, 1, 7, 66];
  drawPolarChart("myPolarChart");

  // console.log(Object.values(barChartData));
}

let tomorrowProb = 0.11;
let twoWeeksProb = 0.22;
let egalProb = 0.33;

d3.csv("Data1.csv").then((data) => {
  // Diese Funktion dauert ein wenig. Deshalb hast du außerhalb dieser Funktion keinen Zugriff auf die Daten.
  // Erst wenn das Auslesen aus der CSV abgeschloßen ist, kannst du damit was machen.

  // >>> schau in die Console. Da siehst du die Daten die du bekommst.
  // Daten sind ein Array von Objekten
  // console.log(data);

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
  tomorrowProb = calculateProbNow(data, dataTime, `dateByTomorrowProb`);
  // console.log(`tomorrowProb: ${tomorrowProb}`);
  // console.log(
  //   `test dateByTomorrowProb: ${calculateProbNow(
  //     data,
  //     dataTime,
  //     `dateByTomorrowProb`
  //   )}`
  // );

  twoWeeksProb = calculateProbNow(data, dataTime, `dateWithin14daysProb`);
  // console.log(`twoWeeksProb: ${twoWeeksProb}`);
  // console.log(
  //   `test dateWithin14daysProb: ${calculateProbNow(
  //     data,
  //     dataTime,
  //     `dateWithin14daysProb`
  //   )}`
  // );
  // console.log(
  //   `test anydayProb: ${calculateProbNow(data, dataTime, `anydayProb`)}`
  // );
  //console.log(median);
  customProb = calculateProbNow(data, dataTime, askedProbCase);
  // console.log(customProb); // hier muss askedProbCase rein, so funktioniert der wert!! muss nur noch eingebunden werden
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

//alles was beim scrolling passieren soll
function updateFrame() {
  let distanceFromTop = rootJS.scrollTop;
  changeButtons(distanceFromTop);
  makeStickySections(distanceFromTop);

  window.requestAnimationFrame(updateFrame);
}
updateFrame();
