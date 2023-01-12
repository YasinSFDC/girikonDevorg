trigger newCreateOrder on New_Order__c (after insert, after update) {
    
        orderCreateHelper.orderdetails(trigger.new); 
    
}