/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package evoting.dao;

import evoting.dbutil.DBConnection;
import evoting.dto.AddCandidateDTO;
import evoting.dto.CandidateDetails;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Base64.Encoder;

/**
 *
 * @author hp
 */
public class CandidateDao {
    private static Statement st1;
    private static Statement st2;
    private static Statement st3;
    private static PreparedStatement ps;
    private static PreparedStatement ps1;
     private static PreparedStatement ps2;
     private static PreparedStatement ps3;
     private static PreparedStatement ps10;
    static{
        try{
            st1=DBConnection.getConnection().createStatement();
              st2=DBConnection.getConnection().createStatement();
                st3=DBConnection.getConnection().createStatement();
            ps=DBConnection.getConnection().prepareStatement("select username from user_details where adhar_no=?");
            ps1=DBConnection.getConnection().prepareStatement("insert into candidate values(?,?,?,?,?,'yes')");
             ps2=DBConnection.getConnection().prepareStatement("Select * from candidate where candidate_id=? and cpresent='yes'");
            ps3=DBConnection.getConnection().prepareStatement("update candidate  set cpresent='no' where candidate_id=?");
         ps10=DBConnection.getConnection().prepareStatement("update candidate set candidate_id=?,party=?,user_id=?,symbol=?,city=? where candidate_id=?");
        }
        catch(SQLException ex){
            ex.printStackTrace();
        }
    }
    public static String getNewCandidateId()throws SQLException{
        ResultSet rs=st1.executeQuery("select count(*) from candidate");
        if(rs.next()){
            return "C"+(100+(rs.getInt(1)+1));
        }
            else
            return "C101";
        }
    public static String getUserNameById(String uid)throws SQLException,IOException
    {
        ps.setString(1,uid);
        ResultSet rs=ps.executeQuery();
        if(rs.next())
            return rs.getString(1);
        return null;
    } 
    
    public static boolean deleteCandidate(String cid)throws SQLException
    {
        ps3.setString(1,cid);
       
        return (ps3.executeUpdate()!=0);
    } 
    
    public static ArrayList<String> getCity()throws SQLException{
        ResultSet rs=st2.executeQuery("Select distinct city from user_details");
        ArrayList<String> city=new ArrayList<>();
        while(rs.next())
        { 
            city.add(rs.getString(1));
        }
        
        return city;
    }
    
    public static boolean addCandidate(AddCandidateDTO candidate)throws SQLException, IOException{
        ps1.setString(1, candidate.getCandidateId());
        ps1.setString(2, candidate.getParty());
        InputStream in=candidate.getSymbol();
        ps1.setBinaryStream(4,in,in.available());
        ps1.setString(5, candidate.getCity());
        ps1.setString(3, candidate.getUserId());
        return (ps1.executeUpdate()!=0);
   
    }
     public static boolean updateCandidate(String cid,AddCandidateDTO candidate)throws SQLException, IOException{
        ps10.setString(1, candidate.getCandidateId());
        ps10.setString(2, candidate.getParty());
        InputStream in=candidate.getSymbol();
        ps10.setBinaryStream(4,in,in.available());
        ps10.setString(5, candidate.getCity());
        ps10.setString(3, candidate.getUserId());
         ps10.setString(6, cid);
        return (ps10.executeUpdate()!=0);
   
    }
    
    public static ArrayList<String> getCandidateId()throws SQLException{
        ResultSet rs=st3.executeQuery("select candidate_id from candidate where cpresent='yes'");
        ArrayList<String> id=new ArrayList<>();
        while(rs.next()){
            id.add(rs.getString(1));
        }
        return id;
    }
    
    
    
  public static CandidateDetails getDetailsById(String cid)throws SQLException,IOException{  
      ps2.setString(1,cid);
      ResultSet rs=ps2.executeQuery();
      CandidateDetails candidate=new CandidateDetails();
      Blob blob;
      byte[] imageBytes;
      String base64Image;
      if(rs.next()){
          blob=rs.getBlob(4);
          imageBytes=blob.getBytes(1L, (int)blob.length());
          Encoder ec=Base64.getEncoder();
          base64Image=ec.encodeToString(imageBytes);
          candidate.setSymbol(base64Image);
          candidate.setCandidateId(cid);
          candidate.setParty(rs.getString(2));
          candidate.setUserId(rs.getString(3));
          candidate.setCity(rs.getString(5));
      }
      return candidate;
  }
  
  
  
      

}

