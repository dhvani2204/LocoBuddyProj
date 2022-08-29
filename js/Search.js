const token = localStorage.getItem("token");
let globalMarkers = []
var platform = new H.service.Platform({
  apikey: "m_np9TW06VJcL5kbGBingynV8xmm9QVM6z6dPplTkrM",
});
var defaultLayers = platform.createDefaultLayers();
var map = new H.Map(
  document.getElementById("mapContainer"),
  defaultLayers.vector.normal.map,
  {
    center: { lat: 50, lng: 5 },
    zoom: 2,
    pixelRatio: window.devicePixelRatio || 1,
  }
);
window.addEventListener("resize", () => map.getViewPort().resize());
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
var ui = H.ui.UI.createDefault(map, defaultLayers);

function booking(event){
  console.log(event.target.getAttribute('data-id'))
  console.log(event.target.getAttribute('data-email'))
  fetch('https://resq-303417.appspot.com/table/book', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': window.localStorage.getItem('token')
    },
    body: JSON.stringify({
      foodId: event.target.getAttribute('data-id'),
      restMail: event.target.getAttribute('data-email'),
      category: 'excessFood'
    })
  })
  .then(res => res.json())
  .then(res => {
      console.log(res)
      Swal.fire({
        icon: "success",
        title: "Yayy",
        text: "Slot successfully booked! :)",
      })
  })
  .catch(err => {
    console.log(err)
  })
}

function bookingGreen(event){
  console.log(event.target.getAttribute('data-id'))
  console.log(event.target.getAttribute('data-email'))
  fetch('http://tamuahack21.herokuapp.com/table/book', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': window.localStorage.getItem('token')
    },
    body: JSON.stringify({
      foodId: event.target.getAttribute('data-id'),
      restMail: event.target.getAttribute('data-email'),
      category: 'greenFood'
    })
  })
  .then(res => res.json())
  .then(res => {
      console.log(res)
      Swal.fire({
        icon: "success",
        title: "Yayy",
        text: "Slot successfully booked! :)",
      })
  })
  .catch(err => {
    console.log(err)
  })
}

function populateData() {
  fetch("https://resq-303417.appspot.com/table/booking/excessFood", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((res) => {
      console.log('Excess food, ', res)
      if (res.isloggedin && !res.isloggedin) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please login first :)",
        }).then((res) => {
          window.location.href = "login.html";
        });
        return;
      }

      if (res.message) {
        res = res.message;
        let content = "";
        res.forEach((ele, index) => {
          if(!ele.BOOKED){

            var LocationOfMarker = { lat: ele.LATITUDE, lng: ele.LONGITUDE };
    
            // optionally - resize a larger PNG image to a specific size
            var pngIcon = new H.map.Icon(
              "images/Marker.png",
              { size: { w: 56, h: 56 } }
            );
  
            // Create a marker using the previously instantiated icon:
            var marker = new H.map.Marker(LocationOfMarker, { icon: pngIcon });
  
            // Add the marker to the map:
            map.addObject(marker);
            globalMarkers.push(marker)


            // Table generation
            content = content + `<tr style="text-align: center">
              <th scope="row">${index + 1}</th>
              <td><a href='./restaurantprofile.html?q=${ele.EMAIL}'>${ele.RES_NAME}</a></td>
              <td>${ele.DATE}</td>
              <td>${ele.TIME_OPEN} to ${ele.TIME_CLOSE}</td>
              <td><button type="button" class="btn btn-primary" style="width:100%" data-toggle="modal" data-target="#address${ele.ID}">View address</button></td>
              <td><button type="button" class="btn btn-primary" style="width:100%" data-toggle="modal" data-target="#food${ele.ID}">View food content</button></td>
              <td><button onclick="booking(event)" data-id=${ele.ID} data-email=${ele.EMAIL} class="btn btn-primary" style="width:100%">Book slot</button></td>
            </tr>`;

            // Food modal
            const foodList = ele.FOOD
            let foodModal = `<div class="modal fade" id="food${ele.ID}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">`
      
            let foodContentList = ``
            foodList.forEach(e => {
              foodContentList = foodContentList + `<p>${e.NAME} - ${e.WEIGHT}kg</p>`
            })
            foodModal = foodModal + foodContentList +  `</div><div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              </div></div></div></div>`

            // dump this food modal
            document.getElementById("modalFoodContent").insertAdjacentHTML('beforeend', foodModal);

            const addressModal = `<div class="modal fade" id="address${ele.ID}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>${ele.RES_STREET}</p><p>${ele.CITY}</p><p>${ele.STATE}</p><p>${ele.COUNTRY}</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>`

          // dump this addressModal
          document.getElementById("modalAddress").insertAdjacentHTML('beforeend', addressModal);
          }
        });
        document.getElementById("rest-display-excess").innerHTML = content;
      }
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: "There was some error from our side!",
      });
    });

  // Green Food


  fetch("https://resq-303417.appspot.com/table/booking/greenFood", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((response) => response.json())
    .then((res) => {
      console.log('Green food, ', res)
      if (res.isloggedin && !res.isloggedin) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please login first :)",
        }).then((res) => {
          window.location.href = "login.html";
        });
        return;
      }

      if (res.message) {
        res = res.message;
        let content = "";
        res.forEach((ele, index) => {
          if(!ele.BOOKED){

            var LocationOfMarker = { lat: ele.LATITUDE, lng: ele.LONGITUDE };
    
            // optionally - resize a larger PNG image to a specific size
            var pngIcon = new H.map.Icon(
              "images/Marker-2.png",
              { size: { w: 56, h: 56 } }
            );
  
            // Create a marker using the previously instantiated icon:
            var marker = new H.map.Marker(LocationOfMarker, { icon: pngIcon });
  
            // Add the marker to the map:
            map.addObject(marker);
            globalMarkers.push(marker)


            // Table generation
            content = content + `<tr style="text-align: center">
              <th scope="row">${index + 1}</th>
              <td><a href='./restaurantprofile.html?q=${ele.EMAIL}'>${ele.RES_NAME}</a></td>
              <td>${ele.DATE}</td>
              <td>${ele.TIME_OPEN} to ${ele.TIME_CLOSE}</td>
              <td><button type="button" class="btn btn-primary" style="width:100%;" data-toggle="modal" data-target="#address${ele.ID}">View address</button></td>
              <td>${ele.WEIGHT}</td>
              <td><button onclick="bookingGreen(event)" data-id=${ele.ID} data-email=${ele.EMAIL} class="btn btn-primary" style="width:100%;">Book slot</button></td>
            </tr>`;

      

            const addressModal = `<div class="modal fade" id="address${ele.ID}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>${ele.RES_STREET}</p><p>${ele.RES_CITY}</p><p>${ele.RES_STATE}</p><p>${ele.RES_COUNTRY}</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>`

          // dump this addressModal
          document.getElementById("modalAddress").insertAdjacentHTML('beforeend', addressModal);
          }
        });
        document.getElementById("rest-display-green").innerHTML = content;
      }
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Oops..",
        text: "There was some error from our side!",
      });
    });
}


window.onload = () => {
  populateData();

  document.getElementById('filter-btn').addEventListener('click', () => {
    document.getElementById('filter-btn').value = "Please wait...."
    if (globalMarkers.length > 0) {
      map.removeObjects(globalMarkers)
      globalMarkers = [];
    }

    let url = `https://tamuhack2021.herokuapp.com/table/filter/excessFood`;
    
    const state = document.getElementById('stateId').value
    const city = document.getElementById('cityId').value
    const country = document.getElementById('countryId').value
    const obj = {}
    if(state){
      obj.state = state
    }
    if(city){
      obj.city = city
    }
    if(country){
      obj.country = country
    }
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(res => {
        if (res.isloggedin && !res.isloggedin) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please login first :)",
          }).then((res) => {
            window.location.href = "login.html";
          });
          return;
        }
  
        if (res.message) {
          res = res.message;
          let content = "";
          res.forEach((ele, index) => {
            if(!ele.BOOKED){
  
              var LocationOfMarker = { lat: ele.LATITUDE, lng: ele.LONGITUDE };
      
              // optionally - resize a larger PNG image to a specific size
              var pngIcon = new H.map.Icon(
                "images/Marker.png",
                { size: { w: 56, h: 56 } }
              );
    
              // Create a marker using the previously instantiated icon:
              var marker = new H.map.Marker(LocationOfMarker, { icon: pngIcon });
    
              // Add the marker to the map:
              map.addObject(marker);
              globalMarkers.push(marker)
  
  
              // Table generation
              content = content + `<tr style="text-align: center">
                <th scope="row">${index + 1}</th>
                <td><a href='./restaurantprofile.html?q=${ele.EMAIL}'>${ele.RES_NAME}</a></td>
                <td>${ele.DATE}</td>
                <td>${ele.TIME_OPEN} to ${ele.TIME_CLOSE}</td>
                <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#address${ele.ID}">View address</button></td>
                <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#food${ele.ID}">View food content</button></td>
                <td><button onclick="booking(event)" data-id=${ele.ID} data-email=${ele.EMAIL} class="btn btn-primary">Book slot</button></td>
              </tr>`;
  
              // Food modal
              const foodList = ele.FOOD
              let foodModal = `<div class="modal fade" id="food${ele.ID}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">`
        
              let foodContentList = ``
              foodList.forEach(e => {
                foodContentList = foodContentList + `<p>${e.NAME} - ${e.WEIGHT}kg</p>`
              })
              foodModal = foodModal + foodContentList +  `</div><div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                  <button type="button" class="btn btn-primary">Save changes</button>
                                </div></div></div></div>`
  
              // dump this food modal
              document.getElementById("modalFoodContent").insertAdjacentHTML('beforeend', foodModal);
  
              const addressModal = `<div class="modal fade" id="address${ele.ID}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>${ele.RES_STREET}</p><p>${ele.CITY}</p><p>${ele.STATE}</p><p>${ele.COUNTRY}</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>`
  
            // dump this addressModal
            document.getElementById("modalAddress").insertAdjacentHTML('beforeend', addressModal);
            }
          });
          document.getElementById("rest-display-excess").innerHTML = content;
          document.getElementById('filter-btn').value = "Filter apply"
        }
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Oops..",
          text: "There was some error from our side!",
        });
      })



      let urlTwo = `https://tamuhack2021.herokuapp.com/table/filter/greenFood`;
      
      const objTwo = {}
  
      if(state){
        objTwo.state = state
      }
      if(city){
        objTwo.city = city
      }
      if(country){
        objTwo.country = country
      }
      document.getElementById('filter-btn').value = "Please wait...."
      fetch(urlTwo, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(objTwo)
      })
        .then((response) => response.json())
        .then((res) => {
          console.log('Green food, ', res)
          if (res.isloggedin && !res.isloggedin) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Please login first :)",
            }).then((res) => {
              window.location.href = "login.html";
            });
            return;
          }
    
          if (res.message) {
            res = res.message;
            let content = "";
            res.forEach((ele, index) => {
              if(!ele.BOOKED){
    
                var LocationOfMarker = { lat: ele.LATITUDE, lng: ele.LONGITUDE };
        
                // optionally - resize a larger PNG image to a specific size
                var pngIcon = new H.map.Icon(
                  "images/Marker-2.png",
                  { size: { w: 56, h: 56 } }
                );
      
                // Create a marker using the previously instantiated icon:
                var marker = new H.map.Marker(LocationOfMarker, { icon: pngIcon });
      
                // Add the marker to the map:
                map.addObject(marker);
                globalMarkers.push(marker)
    
    
                // Table generation
                content = content + `<tr style="text-align: center">
                  <th scope="row">${index + 1}</th>
                  <td><a href='./restaurantprofile.html?q=${ele.EMAIL}'>${ele.RES_NAME}</a></td>
                  <td>${ele.DATE}</td>
                  <td>${ele.TIME_OPEN} to ${ele.TIME_CLOSE}</td>
                  <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#address${ele.ID}">View address</button></td>
                  <td>${ele.WEIGHT}</td>
                  <td><button onclick="bookingGreen(event)" data-id=${ele.ID} data-email=${ele.EMAIL} class="btn btn-primary">Book slot</button></td>
                </tr>`;
    
          
    
                const addressModal = `<div class="modal fade" id="address${ele.ID}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <p>${ele.RES_STREET}</p><p>${ele.RES_CITY}</p><p>${ele.RES_STATE}</p><p>${ele.RES_COUNTRY}</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>`
    
              // dump this addressModal
              document.getElementById("modalAddress").insertAdjacentHTML('beforeend', addressModal);
              }
            });
            document.getElementById("rest-display-green").innerHTML = content;
            document.getElementById('filter-btn').value = "Filter apply"
          }
        })
        .catch((err) => {
          console.log(err)
        });
  })
};
