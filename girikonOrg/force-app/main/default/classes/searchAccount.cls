public inherited sharing class searchAccount {
    @AuraEnabled(cacheable = true)
    public static list<Account> getAccountData(string accKey) {
    accKey = '%' + accKey + '%';
        list<Account> accLst = [SELECT  Id, Name, Phone, Industry, Type, Website From Account WHERE Name LIKE :accKey];
        if(accLst.isEmpty()) {
            throw new AuraHandledException('sorry, we can not find any record.');
        }
        return accLst; 
    }
}
