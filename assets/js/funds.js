var FundData;

$.ajax({
  url: "./assets/csv/Balanced-Fund-Bid-Ask-Price.csv",
  method: "get",
  cache: false,
  success: function(csv) {
    // console.log(data);

    $.ajax({
      url: "./assets/csv/Growth-Fund-Bid-Ask-Price.csv",
      method: "get",
      cache: false,
      success: function(c) {
        // console.log(data);
        csv = csv + "\n" + c;
        processFundData(csv);
      },
      error: function() {}
    });
  },
  error: function() {}
});

function processFundData(csv) {
  var data = csvJSON(csv);
  data = data.filter(function(data) {
    return data.FundName.length != 0 && data.date.length != 0;
  });

  data = data.map(function(d) {
    d.timestamp = new Date(d.date).getTime();
    return d;
  });
  FundData = data;
}

// alert("ok");

function csvJSON(csv) {
  var lines = csv.split("\n");

  var result = [];

  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  return result;
}

$("input").datepicker({});

function generateTable() {
  var FundaName = $(".prices .fund-name").val();
  var from = new Date($(".prices .from").val()).getTime();
  var to = new Date($(".prices .to").val()).getTime();
  console.log(FundaName, from, to);

  var output = FundData.filter(function(d) {
    return d.FundName == FundaName && d.timestamp >= from && d.timestamp <= to;
  });

  var final = output.map(function(d) {
    return [d.date, d.Bid, d.Ask];
  });

  // console.log(final);

  datatable.clear();
  datatable.rows.add(final);
  datatable.draw();
}

var ftl = new TimelineMax();

ftl
  .from(".performances-table", 1, {
    yPercent: 100,
    ease: Power4.easeInOut
  })
  .to("section", 1.5, { yPercent: -40, ease: Power2.easeInOut }, "-=1");

ftl.pause();

function showTable() {
  $(".performances-table").show();

  $("body").addClass("disabled-onepage-scroll");
  generateTable();
  ftl.restart(0);
}

function hideTable() {
  ftl.reverse(0);
  setTimeout(function() {
    $("body").removeClass("disabled-onepage-scroll");
  }, 800);

  setTimeout(function() {
    $(".performances-table").hide();
  }, 1300);
}

$(document).ready(function() {
  datatable = $("#example").DataTable({
    ordering: false
  });
});

$(".perfomance-button").click(function() {
  showTable();
});

$(".prices-button").click(function() {
  showTable();
});

$(".hambuger-fund").click(function() {
  hideTable();
});

$(".fact-sheet-button").click(function() {
  fetchFactSheet();
});

var factSheets = [
  "April'16  Shilling Fund Fact Sheet.pdf",
  "April'16 Balanced Fund Fact Sheet.pdf",
  "April'16 Growth Fund Fact Sheet.pdf",
  "August'16  Shilling Fund Fact Sheet.pdf",
  "August'16 Balanced Fund Fact Sheet.pdf",
  "August'16 Growth Fund Fact Sheet.pdf",
  "December'16  Shilling Fund Fact Sheet.pdf",
  "December'16 Balanced Fund FactSheet.pdf",
  "December'16 Growth Fund Fact Sheet.pdf",
  "February'16  Shilling Fund Fact Sheet.pdf",
  "February'16 Balanced Fund Fact Sheet.pdf",
  "February'16 Growth Fund Fact Sheet.pdf",
  "January'16 Balanced Fund Fact Sheet.pdf",
  "January'16 Growth Fund Fact Sheet.pdf",
  "January'16 Shilling Fund Fact Sheet.pdf",
  "July'16  Shilling Fund Fact Sheet.pdf",
  "July'16 Balanced Fund Fact Sheet.pdf",
  "July'16 Growth Fund Fact Sheet.pdf",
  "June'16  Shilling Fund Fact Sheet.pdf",
  "June'16 Balanced Fund Fact Sheet.pdf",
  "June'16 Growth Fund Fact Sheet.pdf",
  "March'16  Shilling Fund Fact Sheet.pdf",
  "March'16 Balanced Fund Fact Sheet.pdf",
  "March'16 Growth Fund Fact Sheet.pdf",
  "May'16  Shilling Fund Fact Sheet.pdf",
  "May'16 Balanced Fund Fact Sheet.pdf",
  "May'16 Growth Fund Fact Sheet.pdf",
  "November'16  Shilling Fund Fact Sheet.pdf",
  "November'16 Balanced Fund Fact Sheet.pdf",
  "November'16 Growth Fund Fact Sheet.pdf",
  "October'16  Shilling Fund Fact Sheet.pdf",
  "October'16 Balanced Fund Fact Sheet.pdf",
  "October'16 Growth Fund Fact Sheet.pdf",
  "September'16  Shilling Fund Fact Sheet.pdf",
  "September'16 Balanced Fund Fact Sheet.pdf",
  "September'16 Growth Fund Fact Sheet.pdf",
  "April'17  Shilling Fund Fact Sheet.pdf",
  "April'17 Balanced Fund Fact Sheet.pdf",
  "April'17 Growth Fund Fact Sheet.pdf",
  "August'17  Shilling Fund Fact Sheet.pdf",
  "August'17 Balanced Fund Fact Sheet.pdf",
  "August'17 Growth Fund Fact Sheet.pdf",
  "December'17  Shilling Fund Fact Sheet.pdf",
  "December'17 Balanced Fund FactSheet.pdf",
  "December'17 Growth Fund Fact Sheet.pdf",
  "February'17  Shilling Fund Fact Sheet.pdf",
  "February'17 Balanced Fund Fact Sheet.pdf",
  "February'17 Growth Fund Fact Sheet.pdf",
  "January'17  Shilling Fund FactSheet.pdf",
  "January'17 Balanced Fund Fact Sheet.pdf",
  "January'17 Growth Fund Fact Sheet.pdf",
  "July'17  Shilling Fund Fact Sheet.pdf",
  "July'17 Balanced Fund Fact Sheet.pdf",
  "July'17 Growth Fund Fact Sheet.pdf",
  "June'17  Shilling Fund Fact Sheet.pdf",
  "June'17 Balanced Fund Fact Sheet.pdf",
  "June'17 Growth Fund Fact Sheet.pdf",
  "March'17  Shilling Fund Fact Sheet.pdf",
  "March'17 Balanced Fund Fact Sheet.pdf",
  "March'17 Growth Fund Fact Sheet.pdf",
  "May'17  Shilling Fund Fact Sheet.pdf",
  "May'17 Balanced Fund Fact Sheet.pdf",
  "May'17 Growth Fund Fact Sheet.pdf",
  "November'17  Shilling Fund Fact Sheet.pdf",
  "November'17 Balanced Fund Fact Sheet.pdf",
  "November'17 Growth Fund Fact Sheet.pdf",
  "October'17  Shilling Fund Fact Sheet.pdf",
  "October'17 Balanced Fund Fact Sheet.pdf",
  "October'17 Growth Fund Fact Sheet.pdf",
  "September'17  Shilling Fund Fact Sheet.pdf",
  "September'17 Balanced Fund Fact Sheet.pdf",
  "September'17 Growth Fund Fact Sheet.pdf",
  "April'18  Shilling Fund Fact Sheet.pdf",
  "April'18 Balanced Fund Fact Sheet.pdf",
  "April'18 Growth Fund Fact Sheet.pdf",
  "August'18  Shilling Fund Fact Sheet.pdf",
  "August'18 Balanced Fund Fact Sheet.pdf",
  "August'18 Growth Fund Fact Sheet.pdf",
  "February'18  Shilling Fund Fact Sheet.pdf",
  "February'18 Balanced Fund FactSheet.pdf",
  "February'18 Growth Fund Fact Sheet.pdf",
  "January'18  Shilling Fund Fact Sheet.pdf",
  "January'18 Balanced Fund Fact Sheet.pdf",
  "January'18 Growth Fund Fact Sheet.pdf",
  "JuLY'18  Shilling Fund Fact Sheet.pdf",
  "JuLY'18 Balanced Fund Fact Sheet.pdf",
  "July'18 Growth Fund Fact Sheet.pdf",
  "June'18  Shilling Fund Fact Sheet.pdf",
  "June'18 Balanced Fund Fact Sheet.pdf",
  "June'18 Growth Fund Fact Sheet.pdf",
  "October'18 Balanced Fund Fact Sheet.pdf",
  "October'18 Growth Fund Fact Sheet.pdf",
  "October'18 Shilling Fund Fact Sheet.pdf",
  "September'18 Balanced Fund Fact Sheet.pdf",
  "September'18 Growth Fund Fact Sheet.pdf",
  "September'18 Shilling Fund Fact Sheet.pdf"
];

function fetchFactSheet() {
  var name = $(".sheet-fund-name").val();
  var year = $(".sheet-year").val();
  var month = $(".sheet-month").val();

  var full_name = (month + "'" + year + name).toLowerCase().replace(/\s/g, "");
  // console.log(full_name);

  var sheet = factSheets.filter(function(d) {
    return d.toLowerCase().replace(/\s/g, "") == full_name + ".pdf";
  });

  if (sheet.length != 0) {
    console.log(sheet);
    var url = "./sheets/collection/" + sheet[0];
    // console.log(url);
    window.open(url, "_blank");
  } else {
    alert("Sorry, the document could not be found");
  }
}
