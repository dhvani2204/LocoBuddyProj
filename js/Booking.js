var fileInput = document.getElementById('menu-image');

let customFieldCount = 1;
let latitude = '', longitude = '';

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude;
}

getLocation();


const fieldGenerator = () => {
    if (customFieldCount > 10) {
        document.getElementById("inputContError").innerHTML = 'You cannot order more than 10 dishes!';
        document.getElementById("inputContError").style.color = 'red';
        return;
    }
    // <div id="inputCont">
    //     <input type="text" class="dishName"></input>
    //     <input type="number" class="dishWeight"></input>
    // </div>
    const docFrag = document.createDocumentFragment();
    const dishInput = document.createElement('input');
    dishInput.setAttribute('type', 'text');
    dishInput.setAttribute('class', 'style-input-field dishName');
    dishInput.setAttribute('placeholder', 'Name of Dish');
    const dishWtInput = document.createElement('input');
    dishWtInput.setAttribute('type', 'number');
    dishWtInput.setAttribute('class', 'style-input-field dishWeight');
    dishWtInput.setAttribute('placeholder', 'Quantity (in kg)');
    docFrag.appendChild(dishInput);
    docFrag.appendChild(dishWtInput);
    document.getElementById('inputCont').appendChild(docFrag);
    customFieldCount++;
}

document.getElementById('plusBtn').addEventListener('click', () => {
    fieldGenerator();
});


document.getElementById("food-modal-submit").addEventListener('click', () => {
    console.log(latitude, longitude)
    const textNode = document.getElementsByClassName('dishName');
    const weightNode = document.getElementsByClassName('dishWeight');
    let status = [];
    console.log(textNode)
    console.log(weightNode)
    for (let i = 0; i < weightNode.length; i++) {
        console.log(textNode[i].value);
        console.log(weightNode[i].value);
        if (textNode[i].value.length < 1 || weightNode[i].value.length < 1) {
            status.push('false');
        }
        else {
            status.push('true');
        }
    }

    let arr = []
    for (let i = 0; i < weightNode.length; i++) {
        arr.push({
            NAME: textNode[i].value,
            WEIGHT: weightNode[i].value
        })

    }

    const openTime = document.getElementById('openTime').value;
    const closeTime = document.getElementById('closeTime').value;

    if (openTime.length <= 1) {
        document.getElementById("openTime").style.borderColor = "red";
        status.push("false");
    } else {
        status.push("true");
    }

    if (closeTime.length <= 1) {
        document.getElementById("closeTime").style.borderColor = "red";
        status.push("false");
    } else {
        status.push("true");
    }

    if (status.includes("false")) {
        return false;
    } else {
        document.getElementById("food-modal-submit").innerHTML = "Please wait...";
        fetch('https://resq-303417.appspot.com/add/excessFood', {
            method: "POST",
            headers: new Headers({
                'Authorization': localStorage.getItem('token'),
                'content-type': 'application/json'
            }),
            body: JSON.stringify({
                latitude,
                longitude,
                food: arr,
                timeOpen: openTime,
                timeClose: closeTime
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                document.getElementById("food-modal-submit").innerHTML = "Submit";
                console.log(res);
                if (res.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Yayy",
                        text: "Request Posted!",
                    })
                    document.getElementById("excessfood-modal-close").click();
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops",
                        text: "There was some error while saving the data",
                    })
                }

            })
    }


})


document.getElementById('greenfood-modal-submit').addEventListener('click', () => {
    const weight = document.getElementById('greenfood-weight').value;
    const openTime = document.getElementById('openTimeGreenfood').value;
    const closeTime = document.getElementById('closeTimeGreenfood').value;

    let status = [];
    if (weight.length < 1) {
        document.getElementById('greenfood-weight').style.borderColor = 'red';
        document.getElementById('greenfood-weight').placeholder = 'Enter valid weight!';
        status.push('false');
    }
    else {
        status.push('true');
    }
    if (openTime.length < 1) {
        document.getElementById("openTimeGreenfood").style.borderColor = "red";
        status.push('false');
    }
    else {
        status.push('true');
    }
    if (closeTime.length < 1) {
        document.getElementById("closeTimeGreenfood").style.borderColor = "red";
        status.push('false');
    }
    else {
        status.push('true');
    }

    if (status.includes("false")) {
        return false;
    } else {
        document.getElementById("greenfood-modal-submit").innerHTML = "Please wait...";
        fetch('https://resq-303417.appspot.com/add/greenFood', {
            method: "POST",
            headers: new Headers({
                'Authorization': localStorage.getItem('token'),
                'content-type': 'application/json'
            }),
            body: JSON.stringify({
                latitude,
                longitude,
                weight: weight,
                timeOpen: openTime,
                timeClose: closeTime
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                document.getElementById("greenfood-modal-submit").innerHTML = "Submit";
                console.log(res);
                if (res.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Yayy",
                        text: "Request Posted!",
                    })
                    document.getElementById("greenfood-modal-close").click();
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops",
                        text: "There was some error while saving the data",
                    })
                }

            })
    }

})


function logout(event) {
    localStorage.removeItem("token");
}
