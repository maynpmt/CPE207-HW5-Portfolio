// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC0tzoYO_8wAC_jqRhLEeIP8ruZ-3sds4k",
    authDomain: "wthproj.firebaseapp.com",
    databaseURL: "https://wthproj.firebaseio.com",
    projectId: "wthproj",
    storageBucket: "wthproj.appspot.com",
    messagingSenderId: "1079545918046",
    appId: "1:1079545918046:web:2a60eb3b135176f733bacf",
    measurementId: "G-625YEKSWPP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let mCounter, fmCounter, oCounter

$('#submitBtn').click(() => {

    const name = $('#inputName').val();
    const gender = $("input[name='gender']:checked").val();
    const email = $('#inputEmail').val();
    const detail = $('#inputDetail').val();

    console.log('validating...');

    if (name === '') {
        alert('Please in put your name!');
        $('#inputName').focus();
        return false;
    }
    if (email === '' || !validateEmail(email)) {
        alert('Please in put your email!');
        $('#inputEmail').focus();
        return false;
    }

    function validateEmail() {
        atpos = email.indexOf('@');
        dotpos = email.indexOf('.');

        if (atpos < 1 || (dotpos - atpos) < 2) {
            alert('Please enter valid Email !!!');
            return false;
        }

        return true;
    }


    // ------ add data to firebase ----- //
    db.collection("test10")
        .add({
            name: $('#inputName').val(),
            gender: $("input[name='gender']:checked").val(),
            email: $('#inputEmail').val(),
            detail: $('#inputDetail').val(),

        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);

        })
        .catch(function (error) {
            console.error('error ', error);

        });
})

$('#resetBtn').click(() => {
    document.forms["myForm"].reset();
})
db.collection('test10').orderBy('name').onSnapshot(doc => {
    let table = $('tbody')[0]
    $("tbody tr").remove()
    mCounter = 0
    fmCounter = 0
    oCounter = 0 
    doc.forEach(item => {
        let row = table.insertRow(-1)
        let firstCell = row.insertCell(0)
        let secondCell = row.insertCell(1)
        let thirdCell = row.insertCell(2)

        let oldMail = item.data().email;
        let newMail = ""
        for(i=0;i<oldMail.length;i++){
            if(i==0|| oldMail[i]=='@'|| oldMail[i]=='.'){
               newMail += oldMail[i];
            }else newMail +='x';
        }

        firstCell.textContent = item.data().name
        secondCell.textContent = item.data().gender
        thirdCell.textContent = newMail;
        
        if(item.data().gender == 'male') mCounter++;
        else if(item.data().gender == 'female') fmCounter++;
        else oCounter++;

        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
      
        var resultMale = mCounter/(mCounter + fmCounter + oCounter)*100;
        var resultFemale = fmCounter/(mCounter + fmCounter + oCounter)*100;
        var resultOther = oCounter/(mCounter + fmCounter + oCounter)*100;
        
        function drawChart() {
            var data = google.visualization.arrayToDataTable([
              ['Task', 'All Time'],
              ['Male',resultMale],
              ['Female',resultFemale],
              ['Other',resultOther],

            ]);
    
            var options = {
              title: 'Gender',
              titleTextStyle: {color: 'black', fontSize: 18},
              colors:['#66dbff','#ff006f','#866AF4'] ,
              pieHole: 0.5,
            };
    
            var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
            chart.draw(data, options);
          };
        
        
    })

    
});








