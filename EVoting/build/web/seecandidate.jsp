<%@page contentType="text/html" pageEncoding="UTF-8" import="java.util.*,evoting.dto.CandidateDto"%>
<html>
    <head>
        <link href="stylesheet/showcandidate.css" type="text/css" rel="stylesheet">
        <link href="stylesheet/backgroundimage.css" rel="stylesheet">
        <link href="stylesheet/pageheader.css" rel="stylesheet">
        <script src="jsscript/vote.js"></script>
        <script src="jsscript/jquery.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>
        <title>Show candidate</title>
    </head>
    <body>
     <%
          String userid=(String)session.getAttribute("userid");
    if(userid==null)
            {
                response.sendRedirect("accessdenied.html");
                return;
            }
          System.out.println("show candidate jsp");
          /*StringBuffer displayBlock=new StringBuffer("<div class='sticky'><div class='candidate'>VOTE FOR CHANGE</div> "
                  + "<br><div class='subcandidate'>Candidate Belongs to your City are:</div>"
                  +"<div class='logout'><a href='login.html'>logout</a></div>" 
                  +"</div></div><div class='buttons'>");*/
          StringBuffer displayBlock=new StringBuffer("");
          displayBlock.append("<br/><div class='candidateprofile'><strong>Candidates Belongs to your city:</strong><br/><br/></div>");
          ArrayList<CandidateDto> candidate=(ArrayList)request.getAttribute("candidateList");
          for(CandidateDto c:candidate)
          {
          
          displayBlock.append("<label for='"+c.getCandidateId()+"'><img src='data:image/jpg;base64,"+c.getSymbol()+"' style='width:300px;height:200px;'/></label>"
                  + "<br/><div class='candidateprofile'><p>Candidate Id:"+c.getCandidateId()+"<br/>"
                 +"Candidate Name:"+c.getCandidateName()+"<br/>"
                         + " Party:"+c.getParty()+"</label><br/><br/><br/></div>");
          }
          out.println(displayBlock);
      %>
  </div>
</div> 
 </body>
</html>
