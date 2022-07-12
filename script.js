console.log(`hello`);

const h2resultJS = document.getElementsByClassName(`resultH2`);

//dann die buttons zugänglich machen
const buttonJA = document.getElementsByClassName(`ja`);
//const buttonJA = Array.from(buttonJAhtml);
//console.log(buttonJA);

const buttonNEIN = document.getElementsByClassName(`nein`);
const rootJS = document.getElementsByClassName(`root`);

const buttonSkipIntroJS = document.getElementsByClassName(`Intro`);
const buttonSkipConclusionJS = document.getElementsByClassName(`Conclusion`);

//positionen für die buttons
const positionTopIntro = visualViewport.height * 4;
const positionTopConclusion = visualViewport.height * 9;

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

console.log(`viweport-Height:${visualViewport.height * 4}`);

const stickyHeader = document.getElementsByClassName(`h2ToBesticky`);
const stickySub = document.getElementsByClassName(`pToBesticky`);
const positionTopStickySection = visualViewport.height * 12;
const positionBottomStickyScrolling = visualViewport.height * 15;

function startStickyScrolling() {
  stickyHeader[0].classList.add(`stickyText`);
  stickySub[0].classList.add(`stickyText`);
}

function noStickyScrolling() {
  stickyHeader[0].classList.remove(`stickyText`);
  stickySub[0].classList.remove(`stickyText`);
}

function makeStickySections(distanceFromTop) {
  if (distanceFromTop < positionTopStickySection) {
    noStickyScrolling();
  } else if (distanceFromTop >= positionTopStickySection) {
    startStickyScrolling();
  }

  if (distanceFromTop > positionBottomStickyScrolling) {
    noStickyScrolling();
  }
}

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
  h2resultJS[0].innerText = `[custom Text entsprechend dem, was geklickt wurde]`;
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
  h2resultJS[0].innerText = `[custom Text entsprechend dem, was geklickt wurde]`;
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

  Chart.defaults.font.size = 16; //geht
  //Chart.defaults.font.color = "#ffffff";
  Chart.defaults.plugins.legend.display = false; //geht
  Chart.defaults.plugins.tooltip.backgroundColor = `#ffffff`; //geht
  Chart.defaults.plugins.tooltip.cornerRadius = 0; //geht
  Chart.defaults.plugins.tooltip.bodyColor = `#000000`; //geht
  Chart.defaults.plugins.tooltip.titleColor = `#000000`; //geht
  Chart.defaults.plugins.tooltip.padding = 9; //geht
  Chart.defaults.plugins.tooltip.boxPadding = 6; //geht
  Chart.defaults.plugins.tooltip.position = `nearest`; //geht
  //Chart.defaults.global.barThickness = flex;
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      datasets: [
        {
          data: chartData,
        },
      ],
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
            offset: false,
            grid: {
              drawOnChartArea: false,
              tickLength: 16,
            },
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

  Chart.defaults.font.size = 14;
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
  Chart.defaults.plugins.tooltip.position = `nearest`;
  //Chart.defaults.options.scales[x].grid.borderColor = `#000000`;
  //canvas.style.

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          data: chartData1,
          backgroundColor: ["#000000"],
          borderColor: ["#000000"],
          borderWidth: 3,
        },
        {
          data: chartData3,
          backgroundColor: ["rgba(255,255,255,0)"],
          borderColor: ["#DD7F7F"],
          borderWidth: 3,
          fill: true,
        },
        {
          data: chartData2,
          backgroundColor: ["rgba(255,255,255,0.5)"],
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
          label: "My First Dataset",
          data: [21, 5, 1, 1, 7, 66],
          backgroundColor: [
            "#466362",
            "#8E89BF",

            "#000000",
            "#ffffff",

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
      scale: {
        display: false,
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

d3.csv("Data1.csv").then(drawCharts);

//d3.csv("Data1.csv").then((d) => console.log(d));
/*
fetch("Buergeramt_appointment_experiment_sarah_2.csv", {
  mode: "no-cors",
})
  .then((response) => response.text())
  .then((data) => console.log(data));
  */
