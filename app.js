const firebaseConfig = {
    apiKey: "AIzaSyCrUVo3aQmmknnqLjLMIEwArgfQK_5PLho",
    authDomain: "popbalooon.firebaseapp.com",
    projectId: "popbalooon",
    storageBucket: "popbalooon.appspot.com",
    messagingSenderId: "1032737944704",
    appId: "1:1032737944704:web:2b188b6eb912679f8d2265",
    measurementId: "G-H49E7PBHCX"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);



function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location.href="./home.html";     
        })

        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorMessage);
            // ..
        });
}

function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logged out")
        window.location.href="./index.html";
    }).catch((error) => {
        // An error happened.
        console.log(error)
    });
}

function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            console.log(error);
        });
}

const auth = firebase.auth();
var firestore = firebase.firestore();

auth.onAuthStateChanged((user) => {
    firestore.collection('users').doc(user.uid).set({
        email: user.email,
        lastLoggedInAt: new Date()
    }) 
    .then(() => {
        console.log("Document written");
        })
        .catch((error) => {
        console.log("Error in adding document: ", error);
        })
        setData(user);
})

const setData = (user) => {
    firestore.collection('users').doc(user.uid).get().then((querySnapshot) => {
        const data = querySnapshot.data();
        const lastLoggedInAt = data.lastLoggedInAt;
        const lastLoggedInSpan = document.getElementById("ll"); 
        let ful = lastLoggedInAt.toDate();
        let month = ful.getMonth();
        let date = ful.getDate();
        let year = ful.getYear();
        let hour = ful.getHours();
        let min = ful.getMinutes();
        let sec = ful.getSeconds();
        let whole = `${date}/${month}/${year} ${hour}:${min}:${sec}`;
        lastLoggedInSpan.innerHTML = "last logged in at:"+ whole;
    });
}

//main
let popped = 0;

document.addEventListener('mouseover', function(e){
    
    if (e.target.className === "balloon"){
        
                e.target.style.backgroundColor = "#ededed";
                e.target.textContent = "POP!";
                popped++;
                removeEvent(e);
                checkAllPopped();
    }   
});

function removeEvent(e){
    e.target.removeEventListener('mouseover', function(){
        
    })
};

function checkAllPopped(){
    if (popped === 10){
        alert("Your score is 10");
        let gallery = document.querySelector('#balloon-gallery');
        let message = document.querySelector('#yay-no-balloons');
        gallery.innerHTML = '';
        message.style.display = 'block';
    }
};