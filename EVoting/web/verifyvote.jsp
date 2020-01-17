<%-- 
    Document   : verifyvote
    Created on : Dec 29, 2019, 12:08:19 AM
    Author     : hp
--%>
<%
 String userid=(String)session.getAttribute("userid");
 boolean result=(boolean)request.getAttribute("result");
 if(userid!=null && result==true)
 out.println("success");
 else
 out.println("failed");
%>