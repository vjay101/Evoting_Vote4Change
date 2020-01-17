<%-- 
    Document   : loginresponse
    Created on : Dec 21, 2019, 7:30:35 PM
    Author     : hp
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    String userid=(String)request.getAttribute("userid");
    String result=(String)request.getAttribute("result");
    if(userid!=null && result!=null){
        HttpSession sess=request.getSession();
        sess.setAttribute("userid",userid);
        if(result.equalsIgnoreCase("Admin")){
            String url="AdminControllerServlet;jsession="+session.getId();
            out.println(url);
        }
        else{
            String url="VotingControllerServlet;jsession="+session.getId();
            out.println(url);
        }
    }
        else{
                
                out.println("error");
    
    }
    
    %>