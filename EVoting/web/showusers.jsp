<%@page import="java.util.Iterator"%>
<%@page import="java.util.function.*"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.LinkedHashMap"%>
<%@page import="evoting.dto.UserDetails"%>
<%@page import="java.util.Map"%>
<%
     String userid=(String)session.getAttribute("userid");
   if(userid==null)
            {
                response.sendRedirect("accessdenied.html");
                return;
            }
    Map<String,UserDetails> result=(Map)request.getAttribute("result");
    
    Iterator i=result.entrySet().iterator();
    StringBuffer displayBlock = new StringBuffer("<table>");
    displayBlock.append("<tr style='outline: thin solid'><th>User Id</th><th>User Name</th><th>Address</th><th>City</th><th>Email</th><th>Mobile No</th></tr>");
    int count=1;
    while(i.hasNext())
    {
        Map.Entry<String,UserDetails> e=(Map.Entry)i.next();
        displayBlock.append("<tr id='"+("tr"+count)+"' style='outline: thin solid'><td>"+e.getKey()+"</td><td>"+e.getValue().getUsername()+"</td><td>"+e.getValue().getAddress()+"</td><td>"+e.getValue().getCity()+"</td><td>"+e.getValue().getEmail()+"</td><td>"+e.getValue().getMobile()+"</td></tr>");
        count++;
    }
    displayBlock.append("</table>");
    out.println(displayBlock);
%>