function seecandidate(){
    //var data={data:"result"};
    
    $.post("SeeCandidateControllerServlet",function(responseText){  
       // swal("success",responseText.trim(),"success");
        $("#result").html("");
        
        $("#result").html(responseText);
            
            });
}


function castvote(){
      //var data={data:"result"};
    $.post("AddNewVoteControllerServlet",function(responseText){  
       // swal("success",responseText.trim(),"success");
        $("#result").html("");
        $("#result").html(responseText);
            
            });
}


function seevote(){
   //var data={data:"result"};
    $.post("SeeVoteControllerServlet",function(responseText){  
       // swal("success",responseText.trim(),"success");
        $("#result").html("");
        $("#result").html(responseText);
            
            });
    
}


function addvote(){
    var id=$('input[type=radio][name=flat]:checked').attr('id');
    data={candidateid:id};
    $.post("AddVoteControllerServlet",data,function(responseText){  
       // swal("success",responseText.trim(),"success");
        $("#result").html("");
        $("#result").html(responseText);
            
            });
    }
    
    
    function updateprofile(){
         $("#result").html("");
    var newdiv = document.createElement("div");
     newdiv.setAttribute("id", "candidateform");
    newdiv.setAttribute("float", "left");
    newdiv.setAttribute("padding-left", "12px");
    newdiv.setAttribute("border", "solid 2px red");
    newdiv.innerHTML = newdiv.innerHTML+"<br/><strong>Update Profile<br></strong><form method='POST' id = 'fileUploadForm'\n\
    <table><tr><th>Username:</th><td><input type='text' id='username'></td><br/><br/>\
\n<tr><th>Email Id:</th><td><input type='text' id='email'></td><br/><br/>\n\
\n<tr><th>Mobile No:</th><td><input type='text' id='mobile'></td><br/><br/>\n\
\n<tr><th>Address:</th><td><input type='text' id='address'></td><br/><br/>\n\
\n<tr><th>City:  </th><td><input type='text' id='city'></td><br/><br/>\n\
    <tr><th><input type='button' value='Update Profile' onclick='updateprofile2()' id='addcnd'></th>\n\
    <th><input type='reset' value='Clear' onclick='clearText()'></th></table></form>";
    newdiv.innerHTML = newdiv.innerHTML+"<br><span id='addresp'></span>";
    var addcand=document.getElementById("result");
    addcand.appendChild(newdiv);
     
     $.post("FillUserContollerServlet",function(responseText) {
            
        var i=responseText.lastIndexOf("#");
           var j=responseText.lastIndexOf("$");
           var k=responseText.lastIndexOf("&");
           var l=responseText.lastIndexOf("@");
           
	var uname1= responseText.substring(0,i);
       var email1= responseText.substring(i+1,j);
        var mobile1= responseText.substring(j+1,k);
           var address1= responseText.substring(k+1,l);
         var city1= responseText.substring(l+1,responseText.length);
          $('#username').val(uname1);  
         $('#email').val(email1);
         $('#mobile').val(mobile1);
         $('#address').val(address1);
         $('#city').val(city1);
         

    });
    }
var username,city,address,adhar,email,mobile;
  function updateprofile2() {
    username=$("#username").val();
   city=$("#city").val();
    address=$("#address").val();
    email=$("#email").val();
    mobile=$("#mobile").val();
    
            var data={ username: username,
           city: city,
            address: address,
            email: email,
            mobile: mobile};
            $.post("UpdateProfileControllerServlet",data ,processresponse);
        }
function processresponse(responseText)
{
    alert(responseText);
    swal("success!",responseText,"success");
    
}

    



  
   