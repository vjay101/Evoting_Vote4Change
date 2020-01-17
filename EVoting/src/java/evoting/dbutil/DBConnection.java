/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package evoting.dbutil;

/**
 *
 * @author hp
 */
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import java.sql.Connection;
import java.sql.DriverManager;

/**
 *
 * @author acer
 */
public class DBConnection {
    private static Connection conn;
    
    
    static{
        try{
             Class.forName("oracle.jdbc.OracleDriver");
             System.out.println("Drivers loaded succesfully");
            conn = DriverManager.getConnection("jdbc:oracle:thin:@//VIJAY:1521/xe","evotingdb","evoting");
    
        }
        catch(Exception ex){
            System.out.println("Exception in DV");
        }
    }
    
    
    public static Connection getConnection(){
        return conn;
    }
    
    
    public  static void closeConnection(){
        try{
            conn.close();
        }
        catch(Exception ex){
            System.out.println("problem while closing DB");
        }
    }
}

