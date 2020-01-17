function redirectadministratorpage()
{
    swal("Admin!","Redirecting to Admin Page!","success");
    setTimeout(function(){
        window.location="adminactions.jsp";},3000);
    
}


function managecandidate(){
    swal("Admin!","Redirecting to Candidate Management","success");
    setTimeout(function(){
        window.location="managecandidate.jsp";},3000);
    
}


function showaddcandidateform() {
 removecandidateForm();
 var newdiv = document.createElement("div");
    
    newdiv.setAttribute("id", "candidateform");
    newdiv.setAttribute("float", "left");
    newdiv.setAttribute("padding-left", "12px");
    newdiv.setAttribute("border", "solid 2px red");
    newdiv.innerHTML = newdiv.innerHTML+"<form method='POST' enctype='multipart/form-data' id = 'fileUploadForm'>\n\
    <table><tr><th>Candidate id:</th><td><input type='text' id='cid'></td></tr>\n\
    <tr><th>User id:</th><td><input type='text' id='uid' onkeypress='return getdetails(event)'></td></tr>\n\
    <tr><th>Candidate Name:</th><td><input type='text' id = 'cname'></td></tr>\n\
    <tr><th>City:</th><td><select id='city'></select></td></tr>\n\
    <tr><th>Party:</th><td><input type='text' id='party'></td></tr>\n\
    <tr><td colspan='2'><input type='file' name='files' value='Select Image'></td></tr>\n\
    <tr><th><input type='button' value='Add Candidate' onclick='addcandidate()' id='addcnd'></th>\n\
    <th><input type='reset' value='Clear' onclick='clearText()'></th></tr></table></form>";
    newdiv.innerHTML = newdiv.innerHTML+"<br><span id='addresp'></span>";
    var addcand=document.getElementById("result");
    addcand.appendChild(newdiv);
    data={id:"getid"};
    $.post("AddCandidateControllerServlet", data,function(responseText){
        $("#cid").val(responseText);
        $("#cid").prop("disabled", true);
    });
}
function getdetails(e)
{
    if (e.keyCode === 13) {
        data={uid:$("#uid").val()};
       $.post("AddCandidateControllerServlet",data,function(responseText){
           //alert(responseText);
         responseText=responseText.trim();
           var i=responseText.lastIndexOf(",");
	  $('#city').empty();
          $('#city').append(responseText.substring(0,i)); 
          var uname= responseText.substring(i+1,responseText.length);
	  if(uname==="wrong")
		swal("Wrong Adhar!","Adhar no not found in DB","error");
	else{
         $('#cname').val(uname);
         $("#cname").prop("disabled",true);
	    }	
         
            });
    }
}   


function addcandidate()
{
     var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
    var cid=$("#cid").val();
    var cname=$("#cname").val();
    var city=$("#city").val();
    var party=$("#party").val();
    var uid=$("#uid").val();
    data.append("cid",cid);
    data.append("uid",uid);
    data.append("cname",cname);
    data.append("party",party);
    data.append("city",city);
    $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "AddNewCandidateControllerServlet",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                str=data+"....";
                 swal("Admin Success!", str, "success").then((value)=>{
                  
                    
                    showaddcandidateform();
                    
               
    });
            },
            error: function (e) {
                swal("Admin Failure!", e, "success");
                }
        });
}


function showcandidate() {
    $("#result").html(""); 
    var newdiv = document.createElement("div");
    newdiv.setAttribute("id", "candidateform");
    newdiv.setAttribute("float", "left");
    newdiv.setAttribute("padding-left", "12px");
    newdiv.setAttribute("border","solid 2px red");
    newdiv.innerHTML = "<h3>Show Candidate</h3>";
    newdiv.innerHTML = newdiv.innerHTML + "<div style = 'color:white;font-weigth:bold;'>Candidate Id:</div><div>\n\
    <div><select id = 'cid'></select></div>";
    newdiv.innerHTML = newdiv.innerHTML + "<br><span id = 'addresp'></span>";
    var addPrd = $("#result")[0];
    addPrd.appendChild(newdiv);
    data = {data: "cid"};
    
    $.post("ShowCandidateControllerServlet", data, function(responseText) {
        $("#cid").append(responseText);
       
    });
    
    $("#cid").change(function() {
        var cid = $(this).children("option:selected").val();
        data={data:cid};
        $.post("ShowCandidateControllerServlet", data, function(responseText) {
            
            clearText();
            alert(responseText);
            $("#addresp").append(responseText);
        });
    });
}

function removecandidateForm(){
    var contdiv=document.getElementById("result");
    var formdiv=document.getElementById("candidateform");
    if(formdiv!==null){
        $("#candidateform").fadeOut("3500");
        contdiv.removeChild(formdiv);
    }
}


function clearText(){
    $("#addresp").html("");
}




function electionresult()
{
   
 var data={data:"result"};
    $.post("ElectionResultControllerServlet",data,function(responseText) 
   {
      // swal("success",responseText.trim(),"success");
        $("#result").html("");  
      $("#result").html(responseText);

});

}
     
     
     
      var cid;
function deletecandidate()
     {
        removecandidateForm();
    var newdiv = document.createElement("div");
    newdiv.setAttribute("id", "candidateform");
    newdiv.setAttribute("float", "left");
    newdiv.setAttribute("padding-left", "12px");
    newdiv.setAttribute("border","solid 2px red");
    newdiv.innerHTML = "<h3>Delete Candidate</h3>";
    newdiv.innerHTML = newdiv.innerHTML + "<div style = 'color:white;font-weigth:bold;'>Candidate Id:</div><div>\n\
    <div><select id = 'cid'></select></div>";
    newdiv.innerHTML = newdiv.innerHTML + "<br><span id = 'addresp'></span>";
    var addPrd = $("#result")[0];
    addPrd.appendChild(newdiv);
    data = {data: "cid"};
    
    $.post("ShowCandidateControllerServlet", data, function(responseText) {
        $("#cid").append(responseText);
       
    });
    
    $("#cid").change(function() {
        cid = $(this).children("option:selected").val();
        data={data:cid};
        $.post("ShowCandidateControllerServlet", data, function(responseText) {
            
            clearText();
            $("#addresp").append(responseText);
            $("#addresp").append("<br><input type='button' value='Confirm' onclick='confirm()' id='addcnd'>");
        });
    });
     }
     function confirm(){
       data={data:cid};
        $.post("DeleteCandidateControllerServlet", data, function(responseText) {
           alert(responseText);
         swal("success!",responseText,"success");
          deletecandidate();
        });
    
}   
     
      
      
      
   function manageuser(){
       
        swal("Admin!","Redirecting to Manage User!","success");
    setTimeout(function(){
        window.location="manageuser.jsp";},3000);
   }   
  
  function redirectvotingpage(){
       swal("Admin!","Redirecting to Voting Page!","success");
    setTimeout(function(){
        window.location="votingoptions.jsp";},3000);
      
  }
  
  
     var uid;
     function removeuser()
     {
         $("#result").html("");
     var newdiv = document.createElement("div");
    newdiv.setAttribute("id", "candidateform");
    newdiv.setAttribute("float", "left");
    newdiv.setAttribute("padding-left", "12px");
    newdiv.setAttribute("border","solid 2px red");
    newdiv.innerHTML = "<h3>Remove User</h3>";
    newdiv.innerHTML = newdiv.innerHTML + "<div style = 'color:white;font-weigth:bold;'>User Id:</div><div>\n\
    <div><select id = 'uid'></select></div>";
    newdiv.innerHTML = newdiv.innerHTML + "<br><span id = 'addresp'></span>";
    var addPrd = $("#result")[0];
    addPrd.appendChild(newdiv);
    data = {data: "uid"};
    $.post("ShowUserControllerServlet", data, function(responseText) {
           
        $("#uid").append(responseText);
    });
    
    $("#uid").change(function() {
                  

        uid = $(this).children("option:selected").val();
        
        data={data:uid};
        $.post("ShowUserControllerServlet", data, function(responseText) {
            
            clearText();
             
            $("#addresp").append(responseText);
             $("#addresp").append("<br><input type='button' value='Confirm' onclick='removeconfirm()' id='addcnd'>");
        });
    });
     }
     
     function removeconfirm(){
         
          data={data:uid};
        $.post("DeleteUserControllerServlet", data, function(responseText) {
         
         swal("success!",responseText,"success");
           
          removeuser();
        });
     }
     
     
     function showusers(){
         $("#result").html("");
         var data={data:"result"};
    $.post("ShowAllUsersControllerServlet",data,function(responseText){  
       $("#result").html("");
        $("#result").html(responseText);
            
            });
    
}

function showupdatecandidateform()
     {
          $("#result").html("");
    var newdiv1 = document.createElement("div");
    newdiv1.setAttribute("id", "candidateform");
    newdiv1.setAttribute("float", "left");
    newdiv1.setAttribute("padding-left", "12px");
    newdiv1.setAttribute("border","solid 2px red");
    newdiv1.innerHTML = "<h3>Update Candidate</h3>";
    newdiv1.innerHTML = newdiv1.innerHTML + "<div style = 'color:white;font-weigth:bold;'>Candidate Id:</div><div>\n\
    <div><select id = 'cid'></select></div>";
    newdiv1.innerHTML = newdiv1.innerHTML + "<br><span id = 'addresp'></span>";
    var addPrd = $("#result")[0];
    addPrd.appendChild(newdiv1);
    data = {data: "cid"};
    
    $.post("ShowCandidateControllerServlet", data, function(responseText) {
        $("#cid").append(responseText);
       
    });
    
    var newdiv = document.createElement("div");
    newdiv.setAttribute("id", "candidateform");
    newdiv.setAttribute("float", "left");
    newdiv.setAttribute("padding-left", "12px");
    newdiv.setAttribute("border", "solid 2px red");
    newdiv.innerHTML = newdiv.innerHTML+"<form method='POST' enctype='multipart/form-data' id = 'fileUploadForm'>\n\
    <table>\n\
    <tr><th>User id:</th><td><input type='text' id='uid'></td></tr>\n\
    <tr><th>Candidate Name:</th><td><input type='text' id = 'cname'></td></tr>\n\
    <tr><th>City:</th><td><select id='city'></select></td></tr>\n\
    <tr><th>Party:</th><td><input type='text' id='party'></td></tr>\n\
    <tr><td colspan='2'><input type='file' name='files' value='Select Image' id ='image'></td></tr>\n\
    <tr><th><input type='button' value='Update Candidate' onclick='updatecandidate()' id='addcnd'></th>\n\
    <th><input type='reset' value='Clear' onclick='clearText()'></th></tr></table></form>";
    newdiv.innerHTML = newdiv.innerHTML+"<br><span id='addresp'></span>";
    var addcand=document.getElementById("result");
    addcand.appendChild(newdiv);
    
    $("#cid").change(function() {
       
        var cid = $(this).children("option:selected").val();
       var data={data:cid};
        $.post("FillCandidateControllerServlet",data,function(responseText) {
            
         
          var i=responseText.lastIndexOf("#");
           var j=responseText.lastIndexOf("$");
           var k=responseText.lastIndexOf("&");
           
	var userid= responseText.substring(0,i);
        var cname= responseText.substring(i+1,j);
         var party= responseText.substring(j+1,k);
          var image= responseText.substring(k+1,responseText.length);
        data={uid:userid};
       $.post("AddCandidateControllerServlet",data,function(responseText){
           //alert(responseText);
         responseText=responseText.trim();
           var i=responseText.lastIndexOf(",");
	  $('#city').empty();
          $('#city').append(responseText.substring(0,i)); 
          });
       $('#uid').val(userid);  
         $('#cname').val(cname);
         $('#party').val(party);
      
       $("#cname").prop("disabled",true);
         $("#uid").prop("disabled",true);
         $("#result").append(image);
	});
    });
    
       
     
 } 
     function updatecandidate(){
          var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
    var cid=$("#cid").val();
    var cname=$("#cname").val();
    var city=$("#city").val();
    var party=$("#party").val();
    var uid=$("#uid").val();
    data.append("cid",cid);
    data.append("uid",uid);
    data.append("cname",cname);
    data.append("party",party);
    data.append("city",city);
    $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "UpdateACandidateControllerServlet",
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                str=data+"....";
                 swal("Admin Success!", str, "success").then((value)=>{
                  
                    
                   showupdatecandidateform();
                    
               
    });
            },
            error: function (e) {
                swal("Admin Failure!", e, "success");
                }
        });
         
     }
     