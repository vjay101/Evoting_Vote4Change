var userid,password;
function connectUser()
{
    userid=$("#username").val();
    password=$("#password").val();
    if(validate()===false)
    {
        swal("Access Denied!","Please enter userid/password!","error");
        return;
    }
    var data={
        userid:userid,
        password:password
    };
    $.post("LoginControllerServlet",data,processresponse);
}
function processresponse(responseText)
{
    responseText=responseText.trim();
    if(responseText==="error")
    {
        swal("Access Denied!","Please enter valid userid/password!","error");
    }
    else if(responseText.indexOf("jsessionid")!==1)
    {
        alert(responseText);
       swal("Success!","Login Accepted!","success");
     
        setTimeout(function()
        {
            window.location=responseText;
        },3000);
    }
    else
    {
         alert(responseText);
        swal("Access Denied!","Some problem occured please try again later!","error");
    }
}
function validate()
{
    if(userid===""||password==="")
    {
        return false;
    }
    else 
        return true;
}