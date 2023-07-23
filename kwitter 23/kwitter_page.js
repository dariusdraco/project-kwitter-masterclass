//YOUR FIREBASE LINKS

var firebaseConfig = {
  apiKey: "AIzaSyAByCzrwslOi4QWimeSZbDsu1xdKmZWais",
  authDomain: "dbkter-b2f0c.firebaseapp.com",
  projectId: "dbkter-b2f0c",
  storageBucket: "dbkter-b2f0c.appspot.com",
  messagingSenderId: "245225385856",
  appId: "1:245225385856:web:7c711f8aebc8fb45519b65"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
  msg = document.getElementById("msg").value;
  // aginamoto
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0,
  });
  //aginamoto
  document.getElementById("msg").value = "";
}
function getData() {
  firebase
    .database()
    .ref("/" + room_name)
    .on("value", function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        childData = childSnapshot.val();
        if (childKey != "purpose") {
          firebase_message_id = childKey;
          message_data = childData;
          //Start code
          console.log(firebase_message_id);
          console.log(message_data);
          name = message_data['message'];
          like = message_data['like'];
          name_with_tag = " <h4> " + name + " <img class='user_tick'src='tick.png' > </h4> ";
          message_with_tag = "<h4 class='message_h4'> "+ message +  " </h4>";
          like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value = "+like+" onclick = 'updatelike(this.id)'> ";
          span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>like: "+like+" </span> </button> <hr>";

          row = name_with_tag + message_with_tag + like_button + span_with_tag;
          document.getElementById("output").innerHTML+=row;
          //End code
        }
      });
    });
}
getData();

function updatelike(message_id){
    console.log("Clicked on like button -"+message_id);
    button_id=message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes)+1;
    console.log(updated_likes);   
    firebase.database().ref(room_name).child(message_id).update({
      like:updated_likes
    });
}
function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}
