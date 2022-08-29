const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('q');


fetch('https://resq-303417.appspot.com/utility/restaurant/profile', {
    method: 'POST',
    headers: {
        'Authorization': localStorage.getItem('token'),
        'content-type': 'application/json'
    },
    body: JSON.stringify({
        email
    })
})
.then(res => res.json())
.then(res => {
    console.log(res.EXCESS_FOOD)
    console.log(res.GREEN_FOOD)
    let content = ``
    res.EXCESS_FOOD.forEach((ele, index) => {
        content = content + `
        <div
            style="border: 2px solid transparent; border-radius: 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">

            <div class="row" style="margin-top:30px;">
                <div class="col-lg-2"></div>
                <div class="col-lg-8">
                    <div class="row" style="text-align: center;">
                        <div class="col-6" style="font-size: 20px;">Date of posting: ${ele.DATE}</div>
                        <div class="col-6"  style="font-size: 20px;">Time of posting: ${ele.TIME_OPEN} to ${ele.TIME_CLOSE}</div>
                    </div>
                </div>
                <div class="col-2"></div>
            </div>
            <div class="row" style="margin-top:30px;">
                <div class="col-lg-2"></div>
                <div class="col-lg-8">
                    <ul type="none" style="text-align: center;">`



            ele.FOOD.forEach(e => {
                content = content + `<li style="font-weight: bolder; font-size: 25px; text-align: center;">${e.NAME} - ${e.WEIGHT} kg</li>`
            })

  
               content = content +      `</ul>
                </div>
                <div class="col-2"></div>
            </div>`
            if(ele.BOOKED){
                content = content + `<div class="row text-center">
                <div class="col-12 my-4">
                    <h5>User Details</h5>
                </div>
                <div class="col-12">
                    <b>Name</b> : ${ele.BOOKED_BY_NAME} <br>
                    <b>Phone</b>: ${ele.BOOKED_BY_PHONE} <br>
                    <b>Email</b>: ${ele.BOOKED_BY_EMAIL}
                </div>
            </div>`
            } else {
                content = content + `<p style="text-align: center;">Not yet booked!</p>`
            }



        
        
        
        
                    content = content + `<div class="row text-center" style="margin-top: 50px;">
                        <div class="col-12" style="padding-bottom:30px;">
                            <h5>Did the user bought what he made the request for?</h5>
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-8">
                            <div class="row" style="margin-bottom: 50px;">
                                <div class="col-6">
                                    <button id="userprofile-yes">Yes</button>
                                </div>
                                <div class="col-6">
                                    <button id="userprofile-no">No</button>
                                </div>
                            </div>
        
                        </div>
                    </div>
        
                </div>`
    })

    console.log('here', res.GREEN_FOOD)

    res.GREEN_FOOD.forEach((ele, index) => {
        console.log('good')
        content = content + `
        <div
            style="border: 2px solid transparent; border-radius: 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">

            <div class="row" style="margin-top:30px;">
                <div class="col-lg-2"></div>
                <div class="col-lg-8">
                    <div class="row" style="text-align: center;">
                        <div class="col-6"  style="font-size: 20px;">Date of posting: ${ele.DATE}</div>
                        <div class="col-6"  style="font-size: 20px;">Time of posting: ${ele.TIME_OPEN} to ${ele.TIME_CLOSE}</div>
                    </div>
                </div>
                <div class="col-2"></div>
            </div>
            <div class="row" style="margin-top:30px;">
                <div class="col-lg-2"></div>
                <div class="col-lg-8">
                    <ul type="none" style="text-align: center; font-weight: bolder; font-size: 25px;">${ele.WEIGHT} kg of Green material</ul>
                </div>
                <div class="col-2"></div>
            </div>`

            if(ele.BOOKED){
                content = content + `                    <div class="row text-center">
                <div class="col-12 my-4">
                    <h5>User Details</h5>
                </div>
                <div class="col-12">
                    <b>Name</b> : ${ele.BOOKED_BY_NAME} <br>
                    <b>Phone</b>: ${ele.BOOKED_BY_PHONE} <br>
                    <b>Email</b>: ${ele.BOOKED_BY_EMAIL}
                </div>
            </div>`
            } else {
                content = content + `                    <div class="row text-center">
                <div class="col-12 my-4">
                    <h5>User Details</h5>
                </div>
                <div class="col-12">
                    <p>Not yet booked!<p>
                </div>
            </div>`
            }


        
        
        
        
                    content = content + `<div class="row text-center" style="margin-top: 50px;">
                        <div class="col-12" style="padding-bottom:30px;">
                            <h5>Did the user bought what he made the request for?</h5>
                        </div>
                        <div class="col-lg-2"></div>
                        <div class="col-lg-8">
                            <div class="row" style="margin-bottom: 50px;">
                                <div class="col-6">
                                    <button id="userprofile-yes">Yes</button>
                                </div>
                                <div class="col-6">
                                    <button id="userprofile-no">No</button>
                                </div>
                            </div>
        
                        </div>
                    </div>
        
                </div>`
    })
    document.getElementById('post-container').innerHTML = content
})
.catch(err => {
    console.log(err)
})
