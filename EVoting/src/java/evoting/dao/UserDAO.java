/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package evoting.dao;

import evoting.dbutil.DBConnection;
import evoting.dto.CandidateDetails;
import evoting.dto.CandidateDto;
import evoting.dto.UserDTO;
import evoting.dto.UserDetails;
import java.io.IOException;
import java.sql.Blob;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Base64;

/**
 *
 * @author hp
 */
public class UserDAO {
    private static PreparedStatement ps;
     private static PreparedStatement ps5;
     private static PreparedStatement ps7;
     private static PreparedStatement ps8;
      private static PreparedStatement ps11;
      
     
     private static Statement st;
    static{
        try{
            ps=DBConnection.getConnection().prepareStatement("Select * from user_details where adhar_no=? and password=?");
            ps5=DBConnection.getConnection().prepareStatement("select candidate_id,username,party,symbol from candidate,user_details where candidate.user_id=user_details.adhar_no and candidate.cpresent='yes' and candidate.city=(select city from user_details where adhar_no=?)");
           st=DBConnection.getConnection().createStatement();
          ps7=DBConnection.getConnection().prepareStatement("select username,email,mobile_no,address,city from user_details where adhar_no=?");
        ps8=DBConnection.getConnection().prepareStatement("delete from user_details where adhar_no=?");
         ps11=DBConnection.getConnection().prepareStatement("update user_details set username=?,address=?,city=?,email=?,mobile_no=? where adhar_no=?");
        
        } 
        catch(SQLException e){
            if(DBConnection.getConnection()!=null)
                System.out.println("not null");
            e.printStackTrace();
        }
}
    public static String validateUser(UserDTO user)throws SQLException{
        
        ps.setString(1, user.getUserid());
        ps.setString(2,user.getPassword());
        ResultSet rs=ps.executeQuery();
        if(rs.next())
            return rs.getString(8);
        else
            return null;
        }
    
    
    public static ArrayList<CandidateDto> viewCandidate(String userId)throws SQLException,IOException{
        ArrayList<CandidateDto> candidate=new ArrayList<>();
        ps5.setString(1,userId);
        ResultSet rs=ps5.executeQuery();
        Blob blob;
        byte[] imageBytes;
        String base64Image;
        while(rs.next()){
            blob=rs.getBlob(4);
            imageBytes=blob.getBytes(1L,(int)blob.length());
            base64Image=Base64.getEncoder().encodeToString(imageBytes);
            candidate.add(new CandidateDto(rs.getString(1),rs.getString(2),rs.getString(3),base64Image));
        }
        return candidate;
    }
    
    
      public static ArrayList<String> getUserId()throws SQLException,IOException{
         ResultSet rs=st.executeQuery("select adhar_no from user_details where user_type='Voter'");
        
        ArrayList<String> id=new ArrayList<>();
        while(rs.next()){
            id.add(rs.getString(1));
        }
        return id;
    }
     
     public static UserDetails getDetailsById(String uid)throws SQLException,IOException{  
      ps7.setString(1,uid);
      ResultSet rs=ps7.executeQuery();
      UserDetails user=new UserDetails();
      
      if(rs.next()){
          user.setUsername(rs.getString(1));
          user.setEmail(rs.getString(2));         
          user.setMobile(rs.getLong(3));
          user.setAddress(rs.getString(4));
          user.setCity(rs.getString(5));
      }
      return user;
  }
     
     
     public static boolean deleteUser(String uid)throws SQLException
    {
        ps8.setString(1,uid);
       
        return (ps8.executeUpdate()!=0);
    } 
      public static boolean updateUser(String userid,UserDetails user)throws SQLException,IOException
    {
        
      
        ps11.setString(1, user.getUsername());
        ps11.setString(2, user.getAddress());
        ps11.setString(3, user.getCity());
       ps11.setString(4, user.getEmail());
        ps11.setLong(5,user.getMobile());
        ps11.setString(6,userid);
       
        return (ps11.executeUpdate()!=0);
    } 
     
    
    
    
    }

  
   
    

