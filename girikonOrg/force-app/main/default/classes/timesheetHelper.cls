public with sharing class timesheetHelper {
    @AuraEnabled
    public static List<Timesheet__c> fetchTimeSheet() {
        List<Timesheet__c> tSheetList = [SELECT Id, Timesheet_Category__c, Employee_Name__r.Name, Project_Name__c, Task__c, Login_Hours__c, Login_Date__c from Timesheet__c];
        return tSheetList;
    }

    ///////    particular user
// public static List<TimeSheet_Of_Employee__c> getTimesheetOfemp(){
//  try {
// List<User> getProfileid = [SELECT Name FROM User where profileId=:UserInfo.getProfileId() WITH SECURITY_ENFORCED];
// return [SELECT Id, Name, Employee_Name__c, Task__c, Date__c, Start_Date__c, End_Date__c, Duration__c FROM TimeSheet_Of_Employee__c WHERE Employee_Name__c=:getProfileid[0].Name WITH SECURITY_ENFORCED];

//  } catch (Exception e) {
//  throw new AuraHandledException(e.getMessage());
//  }
//  }


}