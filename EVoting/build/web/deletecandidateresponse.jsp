<%
 String userid=(String)session.getAttribute("userid");
 boolean result=(boolean)request.getAttribute("result");
 if(userid!=null && result==true)
 out.println("successfully deleted ");
 else
 out.println("failed");
%>