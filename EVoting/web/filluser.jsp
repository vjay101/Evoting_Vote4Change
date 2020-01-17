<%-- 
    Document   : adminshowcandidate
    Created on : Dec 26, 2019, 8:12:55 PM
    Author     : hp
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="evoting.dto.UserDetails"%>

<%
String userid=(String)session.getAttribute("userid");
if(userid==null){
    response.sendRedirect("accessdenied.html");
    return;
}

String result=(String)request.getAttribute("result");
StringBuffer displayBlock=new StringBuffer("");

if(result.equals("details")){
    UserDetails user=(UserDetails)request.getAttribute("user");
     String str = "";
        displayBlock.append(user.getUsername()+"#"+user.getEmail()+"$"+user.getMobile()+"&"+user.getAddress()+"@"+user.getCity());
    out.println(displayBlock);
    
}



%>