d3
  .csv(
    "https://gist.githubusercontent.com/emanueles/d8df8d875edda71aa2e2365fae2ce225/raw/1e949d3da02ed6caa21fe3a7a12a4e5a611a4bab/stocks.csv"
  )
  .then(function (data) {
    // formatando nossos dados
    let parseDate = d3.timeParse("%Y/%m/%d");
    data.forEach(function (d, i) {
      d.date = parseDate(d.date);
      d.google = +d.google;
      d.facebook = +d.facebook;
    });

    // variables of dataset object (google only)
    let dateDimension = data.dimension((d) => d.date);
    let googleDimension = data.dimension((d) => d.google);
    let topTenGoogle = googleDimension.top(10);
    let facebookDimension = dataset.dimension((d) => d.facebook);
    let googleByDayGroup = dateDimension.group().reduceSum((d) => d.google);

    let lineChart = dc.lineChart("#chart");
    let xScale = d3
      .scaleTime()
      .domain([dateDim.bottom(1)[0].date, dateDim.top(1)[0].date]);

    lineChart
      .width(800)
      .height(400)
      .dimension(dateDim)
      .margins({ top: 30, right: 50, bottom: 25, left: 40 })
      .renderArea(false)
      .x(xScale)
      .xUnits(d3.timeDays)
      .renderHorizontalGridLines(true)
      .legend(dc.legend().x(680).y(10).itemHeight(13).gap(5))
      .brushOn(false)
      .group(googleByDayGroup, "Google");

    dc.renderAll();
  });
