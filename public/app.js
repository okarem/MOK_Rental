// const TempJsonData = JSON.stringify([{
//     car_id: 1,
//     model: "Mazda Lantis",
//     plate_number: "74-416-76",
//    imgurl: "https://images-na.ssl-images-amazon.com/images/I/41EmH75zeML.jpg" 
//   },{
//     car_id: 2,
//     model: "Seat Leon",
//     plate_number: "76-456-12",
//    imgurl: "https://www.seat.co.il/wp-content/uploads/2017/07/new-seat-leon-5-doors-boheme-purple.png" 
//   },{
//     car_id: 3,
//     model: "Renault Clio",
//     plate_number: "85-666-23",
//    imgurl: "https://www.renault.co.il/CountriesData/Israel/images/cars/clio/product/clio-gallery1_ig_w1500_h843.jpg" 
//   }]);





const request = (qs, cb)=> {
        

  let options = {
    // These properties are part of the Fetch Standard
    method: 'GET',
    headers: {
    },        // request headers. format is the identical to that accepted by the Headers constructor (see below)
    body: null,         // request body. can be null, a string, a Buffer, a Blob, or a Node.js Readable stream
    redirect: 'follow', // set to `manual` to extract redirect headers, `error` to reject redirect
    signal: null,       // pass an instance of AbortSignal to optionally abort requests
 
    // The following properties are node-fetch extensions
    follow: 20,         // maximum redirect count. 0 to not follow redirect
    timeout: 0,         // req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies). Signal is recommended instead.
    compress: true,     // support gzip/deflate content encoding. false to disable
    size: 0,            // maximum response body size in bytes. 0 to disable
    agent: null         // http(s).Agent instance or function that returns an instance (see below)
};
options.headers.qs=qs;
console.log('created options');


    fetch('/getQueryData',options).then(response=> response.json()).then((responseData)=>{
      // do data handling here
        console.log("fetching some data");
        cb(null,responseData);

    }).catch((err)=>{ console.log("something went wrong fitching data");});    
    
}




  function updateDom(err, data) {
    if (err) {
      console.log(err);
    } else {
        console.log(data);
        console.log(typeof(data));
      var cars = data;
      console.log(cars);
      var table = document.getElementById('cars-view');
      cars.forEach((car)=> {
          console.log(car);
        var link = document.createElement('a');
        link.href = "/rentCar?car_id="+car.car_id;
        var row = document.createElement('div');
        var name = document.createElement('div');
        name.innerHTML = car.name;
        row.appendChild(name);
        var image = document.createElement('img');
        image.src = car.imgurl;
        row.appendChild(image);
        link.appendChild(row);
        table.appendChild(link);
      });
    }
  }





  request('select * from cars;', updateDom);