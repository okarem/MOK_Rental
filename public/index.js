var pickupDate, returnDate, todaydate;

(function init() {
  showErrorLabel();
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
  console.log(pickupDate);
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

function filterResult() {
  let qs = `SELECT * FROM cars where car_id NOT IN (SELECT cars.car_id from cars JOIN rentals ON cars.car_id=rentals.car_id WHERE (rentals.date_begin<='${pickupDate}' AND rentals.date_return>='${pickupDate}') OR (rentals.date_begin<='${returnDate}' AND rentals.date_return>='${returnDate}') OR (rentals.date_begin>='${pickupDate}' AND rentals.date_return <= '${returnDate}'));`;
  request(qs, updateDom);
  sessionStorage.clear();
  sessionStorage.setItem("pickupDate", pickupDate);
  sessionStorage.setItem("returnDate", returnDate);
}

function showErrorLabel() {
  if (sessionStorage.getItem("success")) {
    document.getElementById("alert2").hidden = "";
    document.getElementById("alert2_content").innerHTML =
      "<strong>YES!</strong> Rent Car Success !! ";

    setTimeout(function() {
      document.getElementById("alert2").hidden = "hidden";
      sessionStorage.removeItem("success");
    }, 3000);
  }
}
