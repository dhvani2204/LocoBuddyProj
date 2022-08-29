// Signup as Restaurant



window.onload = function () {

    document.getElementById("rest-btn").addEventListener("click", () => {
        var name = document.getElementById("name").value;
        var phone = document.getElementById("phone").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var locality = document.getElementById("locality").value;
        var state = document.getElementById("state").value;
        var city = document.getElementById("city").value;
        var country = document.getElementById("country").value;
        var opening = document.getElementById("opening-time").value;
        var closing = document.getElementById("closing-time").value;

        let status = [];
        let re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;


        if (name.length <= 1) {
            document.getElementById("name").style.borderColor = "red";
            document.getElementById("name").value = "";
            document.getElementById("label-name").innerHTML = "Please enter your name";
            status.push("false");
        } else {
            status.push("true");
        }

        if (phone.length !== 10) {
            document.getElementById("phone").style.borderColor = "red";
            document.getElementById("phone").value = "";
            document.getElementById("label-phone").innerHTML =
                "Please enter valid Phone Number";
            status.push("false");
        } else {
            status.push("true");
        }

        if (re.test(email.trim())) {
            status.push("true");
        } else {
            document.getElementById("email").style.borderColor = "red";
            document.getElementById("email").value = "";
            document.getElementById("label-email").innerHTML =
                "Please enter valid email";
            status.push("false");
        }
        var len = password.length;
        if (len <= 6) {
            document.getElementById("password").style.borderColor = "red";
            document.getElementById("password").value = "";
            document.getElementById("label-password").innerHTML =
                "Please enter valid Password";
            status.push("false");
        } else {
            status.push("true");
        }

        if (locality.length <= 1) {
            document.getElementById("locality").style.borderColor = "red";
            document.getElementById("locality").value = "";
            document.getElementById("label-locality").innerHTML = "Please enter your locality";
            status.push("false");
        } else {
            status.push("true");
        }
        if (city.length <= 1) {
            document.getElementById("city").style.borderColor = "red";
            document.getElementById("city").value = "";
            document.getElementById("label-city").innerHTML = "Please enter your city";
            status.push("false");
        } else {
            status.push("true");
        }
        if (state.length <= 1) {
            document.getElementById("state").style.borderColor = "red";
            document.getElementById("state").value = "";
            document.getElementById("label-state").innerHTML = "Please enter your state";
            status.push("false");
        } else {
            status.push("true");
        }
        if (country.length <= 1) {
            document.getElementById("country").style.borderColor = "red";
            document.getElementById("country").value = "";
            document.getElementById("label-country").innerHTML = "Please enter your country";
            status.push("false");
        } else {
            status.push("true");
        }

        if (status.includes("false")) {
            return false;
        } else {


            document.getElementById("rest-btn").value = "Please wait...";

            console.log({
                name: name,
                email: email,
                password: password,
                phoneNumber: phone,
                openingTime: opening,
                closingTime: closing,
                street: locality,
                city: city,
                state: state,
                country: country,
            })
            fetch("https://resq-303417.appspot.com/auth/signup/restaurant", {
                method: "POST",
                headers: new Headers({ "content-type": "application/json" }),
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phoneNumber: phone,
                    openingTime: opening,
                    closingTime: closing,
                    street: locality,
                    city: city,
                    state: state,
                    country: country,
                }),
            })
                .then(function (response) {
                    return response.json();
                })
                .then((res) => {
                    console.log(res);
                    if (res.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Yayyy",
                            text: "You have successfully signedup!",
                        });
                        window.location.href = "login.html";
                        document.getElementById("rest-btn").value = "Signup";
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops..",
                            text: "There was some error. Please try again!",
                        });
                        document.getElementById("rest-btn").value = "Signup";
                    }
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "There was some error from our side. Please try again later",
                    });
                    document.getElementById("rest-btn").value = "Signup";
                });
        }
    });



    // Signup as User

    document.getElementById("user-btn").addEventListener("click", () => {
        var user_name = document.getElementById("user-name").value;
        var user_phone = document.getElementById("user-phone").value;
        var user_email = document.getElementById("user-email").value;
        var user_password = document.getElementById("user-password").value;
        var user_locality = document.getElementById("user-locality").value;
        var user_state = document.getElementById("user-state").value;
        var user_city = document.getElementById("user-city").value;
        var user_country = document.getElementById("user-country").value;

        let status = [];
        let re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;


        if (user_name.length <= 1) {
            document.getElementById("user-name").style.borderColor = "red";
            document.getElementById("user-name").value = "";
            document.getElementById("label-user-name").innerHTML = "Please enter your name";
            status.push("false");
        } else {
            status.push("true");
        }

        if (user_phone.length !== 10) {
            document.getElementById("user-phone").style.borderColor = "red";
            document.getElementById("user-phone").value = "";
            document.getElementById("label-user-phone").innerHTML =
                "Please enter valid Phone Number";
            status.push("false");
        } else {
            status.push("true");
        }

        if (re.test(user_email.trim())) {
            status.push("true");
        } else {
            document.getElementById("user-email").style.borderColor = "red";
            document.getElementById("user-email").value = "";
            document.getElementById("label-user-email").innerHTML =
                "Please enter valid email";
            status.push("false");
        }
        var len = user_password.length;
        if (len <= 6) {
            document.getElementById("user-password").style.borderColor = "red";
            document.getElementById("user-password").value = "";
            document.getElementById("label-user-password").innerHTML =
                "Please enter valid Password";
            status.push("false");
        } else {
            status.push("true");
        }

        if (user_locality.length <= 1) {
            document.getElementById("user-locality").style.borderColor = "red";
            document.getElementById("user-locality").value = "";
            document.getElementById("label-user-locality").innerHTML = "Please enter your locality";
            status.push("false");
        } else {
            status.push("true");
        }
        if (user_city.length <= 1) {
            document.getElementById("user-city").style.borderColor = "red";
            document.getElementById("user-city").value = "";
            document.getElementById("label-user-city").innerHTML = "Please enter your city";
            status.push("false");
        } else {
            status.push("true");
        }
        if (user_state.length <= 1) {
            document.getElementById("user-state").style.borderColor = "red";
            document.getElementById("user-state").value = "";
            document.getElementById("label-user-state").innerHTML = "Please enter your state";
            status.push("false");
        } else {
            status.push("true");
        }
        if (user_country.length <= 1) {
            document.getElementById("user-country").style.borderColor = "red";
            document.getElementById("user-country").value = "";
            document.getElementById("label-user-country").innerHTML = "Please enter your country";
            status.push("false");
        } else {
            status.push("true");
        }

        if (status.includes("false")) {
            return false;
        } else {


            
            let formData = new FormData();
            let input = document.getElementById("user-profile");
            for (const file of input.files) {
                formData.append("image", file, file.name);
            }

            if (input.files.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Oops...',
                    text: 'Uploading image is required!'
                })
                return;
            }
            if (input.files.length > 1) {
                Swal.fire({
                    icon: 'info',
                    title: 'Oops...',
                    text: 'Upload only 1 image!'
                })
                return;
            }

           
            formData.append("name", user_name);
            formData.append("email", user_email);
            formData.append("password", user_password);
            formData.append("phoneNumber", user_phone);
            formData.append("locality", user_locality);
            formData.append("city", user_city);
            formData.append("state", user_state);
            formData.append("country", user_country);


            document.getElementById("user-btn").value = "Please wait...";


            fetch("https://resq-303417.appspot.com/auth/signup/user", {
                method: "POST",
                body: formData,
            })
                .then(function (response) {
                    return response.json();
                })
                .then((res) => {
                    console.log(res);
                    if (res.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Yayyy",
                            text: "You have successfully signedup!",
                        });
                        window.location.href = "login.html";
                        document.getElementById("user-btn").value = "Signup";
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops..",
                            text: "There was some error. Please try again!",
                        });
                        document.getElementById("user-btn").value = "Signup";
                    }
                })
                .catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "There was some error from our side. Please try again later",
                    });
                    document.getElementById("user-btn").value = "Signup";
                });
        }
    });

};