window.onload = () => {
    // Restaurant Login

    document.getElementById("rest-btn").addEventListener("click", function (e) {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        let status = [];

        if (email.length < 1) {
            document.getElementById("email").style.borderColor = "red";
            document.getElementById("email").value = "";
            document.getElementById("label-email").innerHTML =
                "Please enter your email";

            status.push("false");

            document.getElementById("email").classList.add("red");
        } else {
            status.push("true");
        }

        var len = password.length;
        if (len <= 6) {
            status.push("false");
            document.getElementById("password").style.borderColor = "red";
            document.getElementById("password").value = "";
            document.getElementById("label-password").innerHTML =
                "Please enter valid password more than 6 characters";
        } else {
            status.push("true");
        }

        if (status.includes("false")) {
            
            return false;
        } else {
            
            document.getElementById("rest-btn").value = "Loading...";

            fetch("https://resq-303417.appspot.com/auth/login/restaurant", {
                method: "POST",
                headers: new Headers({ "content-type": "application/json" }),
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then(function (response) {
                    return response.json();
                })
                .then((res) => {
                    
                    if (res.token) {
                        localStorage.setItem("token", res.token);
                        
                        document.getElementById("rest-btn").value = "LogIn";
                        Swal.fire({
                            icon: 'success',
                            title: 'Yayy...',
                            text: 'You have successfully loggedin!'
                        });

                        window.location.href = "food.html";
                    } else if (res.noSuchUser){
            
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No such user exist try signing up first'
                        });
                    
                        document.getElementById("rest-btn").value = "LogIn";
                    } else if(res.wrongPassword){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'The password entered by the user was wrong',
                        });
                        document.getElementById("rest-btn").value = "LogIn";
                    } else {

                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Please enter correct username and password.',
                        });
                        document.getElementById("rest-btn").value = "LogIn";
                    }
                })
                .catch((err) => {
                    
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'There was an issue from our side. Please try again',
                    });
                    document.getElementById("rest-btn").value = "LogIn";
                });
        }
    });


    //User Login

    document.getElementById("user-btn").addEventListener("click", function (e) {
        var user_email = document.getElementById("user-email").value;
        var user_password = document.getElementById("user-password").value;
        let status = [];

        if (user_email.length < 1) {
            document.getElementById("user-email").style.borderColor = "red";
            document.getElementById("user-email").value = "";
            document.getElementById("label-user-email").innerHTML =
                "Please enter your email";

            status.push("false");

            document.getElementById("user-email").classList.add("red");
        } else {
            status.push("true");
        }

        var len = user_password.length;
        if (len <= 6) {
            status.push("false");
            document.getElementById("user-password").style.borderColor = "red";
            document.getElementById("user-password").value = "";
            document.getElementById("label-user-password").innerHTML =
                "Please enter valid password more than 6 characters";
        } else {
            status.push("true");
        }

        if (status.includes("false")) {
            
            return false;
        } else {
            
            document.getElementById("user-btn").value = "Loading...";

            fetch("https://resq-303417.appspot.com/auth/login/user", {
                method: "POST",
                headers: new Headers({ "content-type": "application/json" }),
                body: JSON.stringify({
                    email: user_email,
                    password: user_password,
                }),
            })
                .then(function (response) {
                    return response.json();
                })
                .then((res) => {
                    console.log(res);
                    if (res.token) {
                        localStorage.setItem("token", res.token);
                        
                        document.getElementById("user-btn").value = "LogIn";
                        Swal.fire({
                            icon: 'success',
                            title: 'Yayy...',
                            text: 'You have successfully loggedin!'
                        });
                        window.location.href = "user-display.html";
                    } else if (res.noSuchUser){
            
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No such user exist try signing up first'
                        });
                    
                        document.getElementById("user-btn").value = "LogIn";
                    } else if(res.wrongPassword){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'The password entered by the user was wrong',
                        });
                        document.getElementById("user-btn").value = "LogIn";
                    } else {

                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Please enter correct username and password.',
                        });
                        document.getElementById("user-btn").value = "LogIn";
                    }
                })
                .catch((err) => {
                    
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'There was an issue from our side. Please try again',
                    });
                    document.getElementById("user-btn").value = "LogIn";
                });
        }
    });




};