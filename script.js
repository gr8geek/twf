var firebaseConfig = {
    apiKey: "AIzaSyC5hsr4QgPgxv5rAzO3eO-sbkEl_f9WZeo",
    authDomain: "twf-task-b6aa0.firebaseapp.com",
    projectId: "twf-task-b6aa0",
    storageBucket: "twf-task-b6aa0.appspot.com",
    messagingSenderId: "845086508220",
    appId: "1:845086508220:web:6e2cdeacc9177e0fbabcb9",
    measurementId: "G-K348NKVGB0"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();

var docRef = db.collection("users");
var userId = null;
document.addEventListener('DOMContentLoaded', function() {
const auth = document.querySelectorAll(".in")
const notaut = document.querySelectorAll(".out")
const login = document.getElementById("login")
const signup = document.getElementById("sign")
const logout = document.getElementById("logout")

const lform = document.getElementById("loginform")
const sform = document.getElementById("signupform")
logout.onclick = (e)=>{
  e.preventDefault()
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
}
login.onclick = (e)=>{
  e.preventDefault()
  lform.classList.remove("hide")
  sform.classList.add("hide")
}
signup.onclick = (e)=>{
  e.preventDefault()
  lform.classList.add("hide")
  sform.classList.remove("hide")
}
sform.onsubmit = (e)=>{
  e.preventDefault()
  //const fname = document.getElementById("first_name").value
  //const laname = document.getElementById("last_name").value
  const email = document.getElementById("semail").value
  const pass = document.getElementById("spassword").value
  firebase.auth().createUserWithEmailAndPassword(email, pass)
  .then(ob=>{
    const val = ob;
    console.log(val.uid)
    //const uid = ob.user.uid;
    //const setName = firebase.functions.httpsCallable("setName")
    //setName({name:fname+" "+laname}).then(result=>{
    //  console.log(result.data)
    //})
    
    //Make a call to the server so as to add the user to the database along with name and email ID
  })
  .catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
// ...
});
}
lform.onsubmit = (e)=>{
  e.preventDefault()          
  const email = document.getElementById("email").value
  const pass = document.getElementById("password").value
  console.log(email,pass)
  firebase.auth().signInWithEmailAndPassword(email, pass)
  .then(ob=>{
    const val2 = ob;
    console.log("Hello")
    console.log(ob.user.uid)
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  var displayName = user.displayName;
  var email = user.email;
  var emailVerified = user.emailVerified;
  var photoURL = user.photoURL;
  var isAnonymous = user.isAnonymous;
  var uid = user.uid;
  var providerData = user.providerData;

  auth.forEach((i)=>{
      i.classList.remove("hide")
    })
    notaut.forEach((i)=>{
      i.classList.add("hide")
  })
  var detail  = document.querySelector("#detail")
  var docRef = db.collection("users").doc(uid);

  docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          data = doc.data()
          var Dob = data.Dob
          var gender = data.Gender
          var Name = data.Name
          var details = document.querySelector("#detail")
        details.innerHTML = `
        <div class="mydetails"
        style="margin:7%">
            <p>Name: ${Name} <p>
            <p>gender: ${gender} <p>
            <p>Dob: ${Dob} <p>

        </div>
        `

      } else {
          console.log("User details not specified");
          var details = document.querySelector("#detail")
          detail.innerHTML =`

          <div style = "margin:7%">
          <h5>Please fill in the remaining Details</h5>
          <input id="UserName" type="text">
          <label for="UserName">User Name</label>
          <br><br>
          <input id="DOB" type="date">
          <label for="DOB"></label>
          <br><br>
          <input id="gender" type="text">
          <label for="gender">Gender</label>
            <br>
          <button class="btn"id="det11">Submit Details</button>
            
          </div>
          `
          document.querySelector("#det11").addEventListener("click",(e)=>{
            var name = document.querySelector("#UserName").value
            var dob = document.querySelector("#DOB").value
            var gender = document.querySelector("#gender").value
            docRef.set({
                Name:name,
                Dob:dob,
                Gender:gender,
            })
  
          })
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
    console.log(docRef)
  /** 
      docRef.set({
      name:"Pratyush",
      town:"Deoghar",
  })


  */
  console.log(uid)
  userId = uid
  console.log(docRef)

  } else {
    uid = null
    console.log("Signed Out user")
    auth.forEach((i)=>{
      i.classList.add("hide")
    })
    notaut.forEach((i)=>{
      i.classList.remove("hide")
    })

  }
});

});
