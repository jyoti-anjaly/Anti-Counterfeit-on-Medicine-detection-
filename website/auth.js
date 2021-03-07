        //page references
        const signin_page = $('.signin_page');
        const home_page = $('.home_page');
        const signup_page = $('.signup_page');
        const scan_page = $('.scan_id_page');
        const add_medicine_page = $('.add_medicine_page');
        const add_track_page = $('.add_track_page');


        // user details
        var current_user = "";
        var current_user_role = null;

        signin_page.hide();
        signup_page.hide();
        scan_page.hide();
        add_medicine_page.hide();
        add_track_page.hide();
        home_page.show();
        $('.signin_links').each(function () {
            //test
            $(this).hide();
        });
        $(".manufracturer_link").hide();
        $('.suplier_link').hide();

        UserSetup = (userId) => {
            if (userId === "") {
                current_user = "";
                current_user_role = null;
                signin_page.hide();
                signup_page.hide();
                scan_page.hide();
                add_medicine_page.hide();
                add_track_page.hide();
                home_page.show();
                $('.signin_links').each(function () {
                    //test
                    $(this).hide();
                });
                $(".manufracturer_link").hide();
                $('.suplier_link').hide();
            }
            else {
                db.collection("users").doc(userId).get().then((doc) => {
                    if (doc.exists) {
                        current_user_role = doc.data().role;
                        $('.signin_links').each(function () {
                            //test
                            $(this).show();
                        });
                        if (current_user_role === 1) {
                            $(".manufracturer_link").show();
                        }
                        if (current_user_role === 2) {
                            $('.suplier_link').show();
                        }
                        signin_page.hide();
                        signup_page.hide();
                        scan_page.show();
                        add_medicine_page.hide();
                        add_track_page.hide();
                    } else {
                        signin_page.hide();
                        signup_page.hide();
                        scan_page.hide();
                        add_medicine_page.hide();
                        add_track_page.hide();
                        $('.signin_links').each(function () {
                            //test
                            $(this).hide();
                        });
                        $(".manufracturer_link").hide();
                        $('.suplier_link').hide();
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            }

            console.log(current_user);
        }


        //page transition

        $("#scan_product_link").click(() => {
            scan_page.show();
            signin_page.hide();
            signup_page.hide();
            add_medicine_page.hide();
            add_track_page.hide();
            home_page.hide();
            console.log("clicked");
        })

        $("#add_product_link").click(() => {
            add_medicine_page.show();
            scan_page.hide();
            signin_page.hide();
            signup_page.hide();
            add_track_page.hide();
            home_page.hide();
            console.log("clicked");
        })

        $("#signup_link").click(() => {
            signup_page.show();
            add_medicine_page.hide();
            scan_page.hide();
            signin_page.hide();
            add_track_page.hide();
            home_page.hide();
            console.log("clicked");
        })
        $("#signin_link").click(() => {
            signup_page.hide();
            add_medicine_page.hide();
            scan_page.hide();
            signin_page.show();
            add_track_page.hide();
            home_page.hide();
            console.log("clicked");
        })


        var firebaseConfig = {
            apiKey: "AIzaSyCWqWgToZB1lFFix8P0-V3lnSpNk7BCJOw",
            authDomain: "miniproject-e529f.firebaseapp.com",
            projectId: "miniproject-e529f",
            storageBucket: "miniproject-e529f.appspot.com",
            messagingSenderId: "362611609847",
            appId: "1:362611609847:web:a4992d27284b935f8c43f2"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        var db = firebase.firestore();

        //signup
        $("#signup_btn").click(() => {
            var email = $("#email_up").val();
            var password = $("#password_up").val();
            var role = $('#manufracturer').is(':checked') ? 1 : $('#suplier').is(':checked') ? 2 : 3;
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    current_user = user.uid;
                    db.collection("users").doc(user.uid).set({
                        role: role,
                    })
                        .then(() => {
                            UserSetup(current_user);
                        })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                });

        })
        //logout
        $("#logout").click(() => {
            console.log("logout");
            firebase.auth().signOut();
        })
        //signin
        $("#signin_btn").click(() => {
            console.log("clicked");
            var email = $("#email_in").val();
            var password = $("#password_in").val();
            console.log(email+" :"+password);
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    current_user = user.uid;
                    UserSetup(current_user);
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log("error"+errorMessage);
                });
        })
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                UserSetup("");
            } else {
                // User is signed out
                // ...
            }
        });