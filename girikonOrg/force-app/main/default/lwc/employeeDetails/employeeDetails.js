import { LightningElement, track } from 'lwc';

// create record after final submit
import createEmpDetails from '@salesforce/apex/employeeInfoHelper.createEmpDetails';
import createCompanyInfo from '@salesforce/apex/employeeInfoHelper.createCompanyInfo';
// create record after final submit
// More company start
// import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// more company end

export default class EmployeeDetails extends LightningElement {
    @track currentStep = '1';
 
    handleOnStepClick(event) {
        this.currentStep = event.target.value;
    }
 
    get isStepOne() {
        return this.currentStep === "1";
    }
 
    get isStepTwo() {
        return this.currentStep === "2";
    }
 
    get isStepThree() {
        return this.currentStep === "3";
    }
 
    get isEnableNext() {
        return this.currentStep != "3";
    }
 
    get isEnablePrev() {
        return this.currentStep != "1";
    }
 
    get isEnableFinish() {
        return this.currentStep === "3";
    }
 
    handleNext(){
        if(this.currentStep == "1"){
            this.currentStep = "2";
        }
        else if(this.currentStep = "2"){
            this.currentStep = "3";
        }
    }
 
    handlePrev(){
        if(this.currentStep == "3"){
            this.currentStep = "2";
        }
        else if(this.currentStep = "2"){
            this.currentStep = "1";
        }
    }
    

    // More company start
    keyIndex = 0;
@track itemList = [
    {
        id: 0,
     Name:'',
     joiningDate__c:'',
     releaseDate__c:'',
     designation__c:''

    }
];

addRow() {
    ++this.keyIndex;
    var newItem = [{ id: this.keyIndex,
    Name:'',
    joiningDate__c:'',
    releaseDate__c:'',
    designation__c:''}];
    this.itemList = this.itemList.concat(newItem);
    console.log(' this.itemList'+ JSON.stringify(this.itemList));
}

removeRow(event) {
    if (this.itemList.length >= 2) {
        this.itemList = this.itemList.filter(function (element) {
            return parseInt(element.id) !== parseInt(event.target.accessKey);
        });
    }
}

// handleSubmit() {
//     var isVal = true;
//     this.template.querySelectorAll('lightning-input-field').forEach(element => {
//         isVal = isVal && element.reportValidity();
//     });
//     if (isVal) {
//         this.template.querySelectorAll('lightning-record-edit-form').forEach(element => {
//             element.submit();
//         });
//         this.dispatchEvent(
//             new ShowToastEvent({
//                 title: 'Success',
//                 message: 'Contacts successfully created',
//                 variant: 'success',
//             }),
//         );
//         // Navigate to the Account home page
//         this[NavigationMixin.Navigate]({
//             type: 'standard__objectPage',
//             attributes: {
//                 objectApiName: 'Contact',
//                 actionName: 'home',
//             },
//         });
//     } else {
//         this.dispatchEvent(
//             new ShowToastEvent({
//                 title: 'Error creating record',
//                 message: 'Please enter all the required fields',
//                 variant: 'error',
//             }),
//         );
//     }
// }

    // More company end
    
    // Insert data start
 @track employeeName;
 @track employeePhone;
 @track employeeEmail;
 @track colleageName;
 @track universityName;
 @track degree;

    onhandlechange(event){
        console.log('event+'+event.target.accessKey);
        if(event.target.label == 'Employee Name'){
            this.employeeName = event.target.value;
        }
        if(event.target.label == 'Employee Phone'){
            this.employeePhone = event.target.value;
        }
        if(event.target.label == 'Employee Email Id'){
            this.employeeEmail = event.target.value;
        }
        if(event.target.label == 'Colleage Name'){
            this.colleageName = event.target.value;
        }
        if(event.target.label == 'University Name'){
            this.universityName = event.target.value;
        }
        if(event.target.label == 'Degree'){
            this.degree = event.target.value;
        }
        if(event.target.label == 'Company Name'){
            this.itemList[event.target.accessKey].Name = event.target.value;
        }
        if(event.target.label == 'Designation'){
            // this.itemList[event.target.accessKey].designation__c = event.target.value;    kkkk
            this.itemList[event.target.accessKey].Profile__c = event.target.value;
        }
        if(event.target.label == 'Joining Date'){
            this.itemList[event.target.accessKey].Join_Date__c = event.target.value;
        }
        if(event.target.label == 'Release Date'){
            // this.itemList[event.target.accessKey].releaseDate__c = event.target.value;     kkkk
            this.itemList[event.target.accessKey].Release_Date__c = event.target.value;
        }

    }
    empId;
    handleFinish() {
        createEmpDetails({ emName: this.employeeName, emPhone: this.employeePhone, emEmail: this.employeeEmail, 
            colName: this.colleageName, uniName: this.universityName, degree: this.degree})

            .then(result => {
                if (result) {
                    this.empId=result;
                    console.log('empId>>'+result);
                    if(this.empId != null){
                        this.insertCompanyInfo()
                    }
                    const evt = new ShowToastEvent({
                        title: 'Creation Success',
                        message: 'Record Created SuccesFully',
                        variant: 'success',
                        mode: 'dissmissable'
                    });
                    this.dispatchEvent(evt);
                    this.createdAccountId = result.Id;
                }
                else {
                    this.error = 'You dont have permission to create record';
                }
            })
            .catch(error => {
                this.error = error;
                this.createdAccountId = undefined;
            });
    }
    // Insert data end
    insertCompanyInfo(){
        console.log('final'+this.itemList);
        createCompanyInfo({itemList:JSON.stringify(this.itemList),empId:this.empId}).then(response=>{
           console.log('response>>'+response);
        }).catch(error=>{
            console.log(error);
        })
    }
}