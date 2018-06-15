var $stateInput = d3.select("#state");
var $cityInput = d3.select("#city");
var $searchBtn = d3.select("#search");
var $dateInput = d3.select("#datetime");
var $countryInput = d3.select("#country");
var $shapeInput = d3.select("#shape");

var $maxRows = d3.select("#maxRows");


var $table = d3.select("#mytable");
var $tbody = d3.select("tbody");

// $searchBtn.addEventListener("click", refreshTable);

var $pagination = d3.select("#pagination");
$pagination.on("click", changePage);

var url = "https://jsonblob.com/api/jsonBlob/4176e27b-4313-11e8-a75a-d5a15cebc6ed";
d3.json(url, init);


var filters = {};
d3.selectAll(".form-control").on("change", function(event) {
  var changedElement = d3.event.target;
  var filterId = changedElement.id;
  var value = changedElement.value.trim();

  if (value) {
    filters[filterId] = value;
  }
  else {
    delete filters[filterId];
  }
  refreshTable();
});

var data = {
  filter: function() {
    this.filtered = this.dataSet.filter(function(ufoRecord) {
      var matchesFilters = true;

      Object.entries(filters).forEach(function(entry) {
        var filterId = entry[0];
        var filterValue = entry[1];

        if (!fuzzyMatches(filterValue, ufoRecord[filterId])) {
          matchesFilters = false;
        }
      });
      return matchesFilters;
    });
  }
};

function fuzzyMatches(search, result) {
  var slicedResult = result.slice(0, search.length);

  return search === slicedResult;
}



$maxRows.on("change", loadTable);



var page = {
  currentPage: 1,
  numPages: function() {
    return Math.ceil(data.filtered.length / this.resultsPerPage());
  },
  resultsPerPage: function() {
    return $maxRows.property("value").trim();
  },
  
  getPageSubset: function() {
    var counter;
    if (this.currentPage < 11) {
      counter = 1;
    }
    else if (this.currentPage % 10 === 0) {
      counter = this.currentPage - 9;
    }
    else {
      counter = Math.floor(this.currentPage / 10) * 10 + 1;
    }

    var pageNumbers = [counter];
    counter++;
    while (pageNumbers[pageNumbers.length - 1] < this.numPages() && pageNumbers.length < 10) {
      pageNumbers.push(counter);
      counter++;
    }
    return pageNumbers;
  },
  paginate: function(array, pageSize, pageNumber) {
    pageNumber--;
    return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
  }
};

function init(dataSet) {

  data.dataSet = dataSet;
  data.filtered = dataSet;

  loadDropdown();
  loadTable();
  appendPagination();
}

function refreshTable() {
  data.filter();
  loadTable();
  appendPagination();
}


function loadDropdown() {
  var dropdownOptions = {
    country: ["<option default value=''>all</option>"],
    shape: ["<option default value=''>all</option>"]
  };

  var countryDropdown = d3.select("#country");
  var shapeDropdown = d3.select("#shape");

  var optionKeys = Object.keys(dropdownOptions);

  for (var i = 0; i < data.dataSet.length; i++) {
    var ufoData = data.dataSet[i];
    for (var j = 0; j < optionKeys.length; j++) {
      var dropdownOption = optionKeys[j];
      var optionHTML = "<option value='" + ufoData[dropdownOption] + "'>" + ufoData[dropdownOption] + "</option>";
      if (dropdownOptions[dropdownOption].indexOf(optionHTML) < 0) {
        dropdownOptions[dropdownOption].push(optionHTML);
      }
    }
  }
  countryDropdown.html(dropdownOptions.country.join(""));
  shapeDropdown.html(dropdownOptions.shape.join(""));
}

function changePage(event) {
  d3.event.preventDefault();
  var paginationBtn = d3.event.target;
  var newPageNumber = parseInt(paginationBtn.getAttribute("href"));

  if (newPageNumber < 1 || newPageNumber > page.numPages()) {
    return false;
  }
  page.currentPage = newPageNumber;
  if (paginationBtn.className === "page-direction") {
    appendPagination();
  }
  else {
    setActivePage();
  }
  return loadTable();
}

function setActivePage() {
  $pagination.selectAll("li").each(function() {
    d3.select(this)
      .select("a")
      .classed("active", function(d, i) {
        return this.getAttribute("href") === page.currentPage;
      });
  });
}


function appendPagination() {
  var pageSubset = page.getPageSubset();
  $pagination
    .html("")
    .append("li")
      .append("a")
        .attr("class", "page-direction")
        .attr("href", pageSubset[0] - 1)
        .html("<");
  for (var i = 0; i < pageSubset.length; i++) {
    var currentPage = pageSubset[i];
    $pagination
      .append("li")
        .append("a")
          .attr("class", "page-direction")
          .attr("href", currentPage)
          .classed("active", currentPage === page.currentPage)
          .html(currentPage);
  }

  $pagination
    .append("li")
      .append("a")
        .attr("class", "page-direction")
        .attr("href", pageSubset[0] + pageSubset.length)
        .html(">");
}

function loadTable() {
  var tbody = d3.select("tbody")
    .html("");

  var resultsThisPage = page.paginate(
    data.filtered,
    page.resultsPerPage(),
    page.currentPage
  );

  for (var i = 0; i < resultsThisPage.length; i++) {
    var ufoObject = resultsThisPage[i];
    var ufoKeys = Object.keys(ufoObject);
    var row = tbody.append("tr")
      .classed("table-row", true);

    for (var j = 0; j < ufoKeys.length; j++) {
      var currentKey = ufoKeys[j];

      row.append("td")
        .html(ufoObject[currentKey])
        .classed("text-center", true)
        .attr("data-th", currentKey);
    }
  }
}