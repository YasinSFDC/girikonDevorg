import { LightningElement, track } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import fetchTimeSheet from '@salesforce/apex/timesheetHelper.fetchTimeSheet';
import TIMESHEETS_OBJECT from '@salesforce/schema/Timesheet__c';
import PROJECT_NAME_FIELD from '@salesforce/schema/Timesheet__c.Project_Name__c';
import TASK_FIELD from '@salesforce/schema/Timesheet__c.Task__c';
import EMPLOYEE_NAME_FIELD from '@salesforce/schema/Timesheet__c.Employee_Name__c';
import HOUR_FIELD from '@salesforce/schema/Timesheet__c.Login_Hours__c';
import DATE_FIELD from '@salesforce/schema/Timesheet__c.Login_Date__c';
import TIMESHEET_CATEGORY_FIELD from '@salesforce/schema/Timesheet__c.Timesheet_Category__c';



export default class Timesheet extends LightningElement {
    areDetailsVisible = true;
    
    ObjectApiName = TIMESHEETS_OBJECT;

    timesheetCategory = TIMESHEET_CATEGORY_FIELD;
    employeeName = EMPLOYEE_NAME_FIELD;
    projectName = PROJECT_NAME_FIELD;
    loginDate = DATE_FIELD;
    task =TASK_FIELD;
    loghours = HOUR_FIELD;

    @track tSheetList=[];
    @track error;

    @track columns=[
        
        {label: 'Timesheet Category', fieldName: 'Timesheet_Category__c', type: 'picklist'},
        {label: 'Employee Name', fieldName: 'Employee_Name__c', type: 'text'},
        {label: 'Project Name', fieldName: 'Project_Name__c', type: 'text'},
        {label: 'Date', fieldName: 'Login_Date__c', type: 'date'},
        {label: 'Task Name', fieldName: 'Task__c', type: 'text'},
        {label: 'Login Hour', fieldName: 'Login_Hours__c', type: 'number'},
    ];


    handleEmpDetailsCreated(event){

        const events = new ShowToastEvent({
            title :"Successful",
            message:"Timesheet Submitted Successfully",
            variant:"success",
        });

        this.dispatchEvent(events);
    }

    fetchSheet(){
        fetchTimeSheet()
            .then(result => {
                console.log(result);
                this.tSheetList = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.tSheetList = undefined;
            });
    }
}