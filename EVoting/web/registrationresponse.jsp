<%-- 
    Document   : registrationresponse
    Created on : Dec 20, 2019, 11:03:53 AM
    Author     : hp
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    boolean result=(Boolean)request.getAttribute("result");
    boolean userfound=(Boolean)request.getAttribute("userfound");
    if(userfound==true)
    {
        out.println("uap");
        
    }
    else if(result==true)
    {
        out.println("success");
        
    }
    else
    {
        out.println("error");
    }
    %>