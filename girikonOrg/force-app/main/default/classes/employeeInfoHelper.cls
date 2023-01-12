public with sharing class employeeInfoHelper {
    public employeeInfoHelper() {
    }
    @auraEnabled
    public static String createEmpDetails(String emName, String emPhone, String emEmail, String colName, String uniName, String degree ){

                Employee__c employ = new Employee__c();
                employ.Name = emName;
                employ.Phone__c = emPhone;
                employ.Email__c = emEmail;
                employ.College_Name__c = colName;
                employ.University_Name__c = uniName;
                employ.Degree__c = degree;
                // employ.Company_Name__c = ComName;
                // employ.Joining_Date__c = joinDat;
                // employ.Relieving_Date__c = relDat;
                // employ.Designation__c = desgntn;
                if(isCreatable('Employee__c') == true){
                    insert employ;
                     return employ.Id;
                }
                return null;
    }

    public static boolean isCreatable(string sObjectType){
        sObjectType schemaType = schema.getGlobalDescribe().get(sObjectType);
        return schemaType.getDescribe().isCreateable();
    }
    @auraEnabled
    public static List<Company__c> createCompanyInfo(List<Company__c> itemList, String empId){
    List<Company__c> listcompany=new  List<Company__c>();
      for(Company__c item: itemList){
        System.debug('lstComp>>'+item);
        Company__c obj=new Company__c();
         obj.Employee__c=empId;
         obj.Name=item.Name;
        obj.Join_Date__c=item.Join_Date__c;
        obj.Release_Date__c=item.Release_Date__c;        //kkkk   
        obj.Profile__c=item.Profile__c;                 //kkkk
        listcompany.add(obj);
      }
      insert listcompany;
        return itemList;
    }

}
