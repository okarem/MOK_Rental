var pickupDate = sessionStorage.getItem("pickupDate");
var returnDate = sessionStorage.getItem("returnDate");

co;

console.log(pickupDate);
const TempJsonData = JSON.stringify([
  {
    car_id: 1,
    model: "Mazda Lantis",
    plate_number: "74-416-76",
    imgurl: "https://images-na.ssl-images-amazon.com/images/I/41EmH75zeML.jpg"
  },
  {
    car_id: 2,
    model: "Seat Leon",
    plate_number: "76-456-12",
    imgurl:
      "https://www.seat.co.il/wp-content/uploads/2017/07/new-seat-leon-5-doors-boheme-purple.png"
  },
  {
    car_id: 3,
    model: "Renault Clio",
    plate_number: "85-666-23",
    imgurl:
      "https://www.renault.co.il/CountriesData/Israel/images/cars/clio/product/clio-gallery1_ig_w1500_h843.jpg"
  }
]);

const request = (url, cb) => {
  // fetch(url).then(response=> response.json();).then(
  //   // do data handling here

  cb(null, TempJsonData);

  // ).catch((err)=>{ console.log("something went wrong fitching data");});
};

function updateDom(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    var cars = JSON.parse(data);
    console.log(cars);
    var table = document.getElementById("cars-view");
    cars.forEach(car => {
      console.log(car);
      var link = document.createElement("a");
      link.href = "/rentCar?car_id=" + car.car_id;
      var row = document.createElement("div");
      var name = document.createElement("div");
      name.innerHTML = car.name;
      row.appendChild(name);
      var image = document.createElement("img");
      image.src = car.imgurl;
      row.appendChild(image);
      link.appendChild(row);
      table.appendChild(link);
    });
  }
}

request("/getCars", updateDom);
