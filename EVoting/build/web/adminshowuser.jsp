<%-- 
    Document   : adminshowcandidate
    Created on : Dec 26, 2019, 8:12:55 PM
    Author     : hp
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="evoting.dto.UserDetails"%>
<%@page import="java.util.ArrayList"%>
<%
String userid=(String)session.getAttribute("userid");
if(userid==null){
    response.sendRedirect("accessdenied.html");
    return;
}

String result=(String)request.getAttribute("result");
StringBuffer displayBlock=new StringBuffer("");
if(result.equals("userList")){
    ArrayList<String> userId=(ArrayList)request.getAttribute("userId");
      for(String s : userId) {
            displayBlock.append("<option value = '" + s + "'>" + s + "</option>");
        }
    out.println(displayBlock);
}
else if(result.equals("details")){
    UserDetails user=(UserDetails)request.getAttribute("user");
     String str = "";
        displayBlock.append("'<table>"
                                +"<tr><th>Username:</th><td>" + user.getUsername() + "</td></tr>"
                                +"<tr><th>Email:</th><td>" + user.getEmail() + "</td></tr>"
                                +"<tr><th>Mobile No:</th><td>" + user.getMobile() + "</td></tr>"
                                +"<tr><th>Address:</th><td>" + user.getAddress() + "</td></tr>"
                               +"<tr><th>City:</th><td>" + user.getCity() + "</td></tr>"
                                
                                + "</table>'"
                                
        );
          
    
   
    out.println(displayBlock);
    
}



%>