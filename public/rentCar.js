var url_string = window.location.href;
var url = new URL(url_string);
var carid = url.searchParams.get("car_id");

var imgurl, model, plate_number;

request(`select * from cars where car_id=${carid};`, (err, data) => {
  model = data[0].model;
  //   console.log(data[0]);

  imgurl = data[0].imgurl;
  //   console.log(imgurl);

  plate_number = data[0].plate_number;
  var name = document.getElementById("film_name");
  name.innerHTML = model;

  var img = document.getElementById("film_image");
  img.src = imgurl;

  var votes = document.getElementById("filmvots");
  votes.innerHTML = " car plate number: <br>" + plate_number;
});

if (
  sessionStorage.getItem("returnDate") == null ||
  sessionStorage.getItem("returnDate") == null
) {
  window.location.href = "http://" + window.location.host;
}

function checkout() {
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var phone = document.getElementById("phone").value;
  var city = document.getElementById("city").value;

  const update_user = `INSERT INTO users (first_name,last_name, city,phone) VALUES ('${fname}', '${lname}','${city}','${phone}');`;
  request(update_user, (err, res) => {});
  request(
    `select user_id from users where first_name='${fname}' AND last_name='${lname}' AND city='${city}' AND phone='${phone}' LIMIT 1;`,
    (err, data) => {
      var userid = data[0].user_id;
      var pickupDate = sessionStorage.getItem("pickupDate");
      var returnDate = sessionStorage.getItem("returnDate");
      var update_rental = `INSERT INTO rentals (car_id,user_id, date_begin,date_return) VALUES ('${carid}', '${userid}','${pickupDate}','${returnDate}')`;

      request(update_rental, (err, res) => {
        window.location.href = "http://" + window.location.host;
      });
    }
  );
}
