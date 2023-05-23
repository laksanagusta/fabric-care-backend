const getStatusColor = (status) => {
  const color = {
    ["done"]: "success",
    ["inbound"]: "warning",
    ["ongoing"]: "info",
  };

  return color[status];
};

const addHours = (date, hours) => {
  const hoursToAdd = hours * 60 * 60 * 1000;
  date.setTime(date.getTime() + hoursToAdd);
  return date;
};

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

const formatDate = (date) => {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
};

function generateArrayOfYears() {
  var max = new Date().getFullYear();
  var min = max - 9;
  var years = [];

  for (var i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
}

const yearValue = (date) => {
  return {
    "01": "january",
    "02": "february",
    "03": "maret",
    "04": "april",
    "05": "mei",
    "06": "juni",
    "07": "juli",
    "08": "agustus",
    "09": "september",
    "10": "oktober",
    "11": "november",
    "12": "desember",
  };
};

const monthLabel = (date) => {
  return [
    "january",
    "february",
    "maret",
    "april",
    "mei",
    "juni",
    "juli",
    "agustus",
    "september",
    "oktober",
    "november",
    "desember",
  ];
};

module.exports = {
  getStatusColor,
  addHours,
  formatDate,
  generateArrayOfYears,
  yearValue,
  monthLabel
};
