var pickupDate, returnDate, todaydate;

(function init() {
  todaydate = new Date().toISOString().split("T")[0];
  document.getElementById("Pickup").value = todaydate;
  document.getElementById("ReturnDate").value = todaydate;
  pickupDate = returnDate = todaydate;
})();

function addError(st) {
  document.getElementById("error_span").hidden = "";
  document.getElementById("btu").disabled = true;
  document.getElementById("btu").style.backgroundColor = "#af4c4c";
  document.getElementById("error_span").innerHTML = st;
}
function deletError() {
  document.getElementById("btu").disabled = false;
  document.getElementById("error_span").hidden = "hidden";
  document.getElementById("btu").style.backgroundColor = "#4caf50";
}

document.getElementById("Pickup").addEventListener("change", function(event) {
  pickupDate = new Date(event.target.value).toISOString().split("T")[0];
  //   console.log(new Date(event.target.value));
  checkDates();
});

function checkDates(err) {
  var flage = 0;
  pickupDate < todaydate ? addError("Error on pickup date") : flage++;
  returnDate < pickupDate
    ? addError("Return date less than pickup date")
    : flage++;
  if (flage == 2) deletError();
}

document
  .getElementById("ReturnDate")
  .addEventListener("change", function(event) {
    returnDate = new Date(event.target.value).toISOString().split("T")[0];
    checkDates();
  });

// function checkDates() {}

function filterResult() {
  sessionStorage.setItem("pickupDate", pickupDate);
  sessionStorage.setItem("ReturnDate", returnDate);

  console.log("foo");
}
// addError("return date less than pickup date")
