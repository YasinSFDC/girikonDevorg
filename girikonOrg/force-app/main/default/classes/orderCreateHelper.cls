public class orderCreateHelper {
    public static void orderdetails(list<New_Order__c> ordsList) {
        Set<String> itemsCode = new Set<String>();
        Set<String> item = new Set<String>();
        for(New_Order__c  ord: ordsList){
            itemsCode.add(ord.Item_Code__c);
            item.add(ord.Item_Code__c);
        }
        Map<Id,Inventory__c> mapInventry = new Map<Id,Inventory__c>([Select Id,Total_Available_in_Stock__c,Selling_Price_Per_Item__c 
                                    from Inventory__c where Item_Code__c =:item OR Item_Code__c =:itemsCode]);
        for(New_Order__c ord1 : ordsList){
            if(mapInventry.containsKey(ord1.Inventory__c)){ 
                if(trigger.isBefore){
                    ord1.Selling_Price__c = mapInventry.get(ord1.Inventory__c).Selling_Price_Per_Item__c*ord1.Number_of_Items_Sold__c;
                }
                
                    mapInventry.get(ord1.Inventory__c).Total_Available_in_Stock__c = mapInventry.get(ord1.Inventory__c)
                                            .Total_Available_in_Stock__c - ord1.Number_of_Items_Sold__c;
            
            }
        }
    
    
    
       update mapInventry.values();
    }
}
