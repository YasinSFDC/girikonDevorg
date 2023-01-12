import { LightningElement, track, wire } from 'lwc';
import retrieveAccountData from '@salesforce/apex/searchAccount.getAccountData';
const columns = [
    {
        label: 'Name',
        fieldName: 'Name',
    },
    {
        label: 'Phone',
        fieldName: 'Phone'
    },
    {
        label: 'Industry',
        fieldName: 'Industry'
    },
    {
        label: 'Type',
        fieldName: 'Type'
    },
    {
        label: 'Website',
        fieldName: 'Website'
    }
];

export default class SearchAccount extends LightningElement {
searchData;
columns = columns;
errorMsg = '';
strSearchAccName = '';

handleAccountName(event) {
    this.errorMsg = '';
    this.strSearchAccName = event.currentTarget.value;
}

handleSearch() {
    if(!this.strSearchAccName) 
    {
        this.errorMsg = 'Please enter account name to search.';
        this.searchData = undefined;
        return;
    }
    retrieveAccountData({accKey : this.strSearchAccName})
    .then(result => {
        this.searchData = result;
        })
    .catch(error => {
        this.searchData = undefined;
        if(error) 
        {
            if (Array.isArray(error.body)) 
            {
                this.errorMsg = error.body.map(e => e.message).join(', ');
            } else if (typeof error.body.message === 'string') 
            {
                this.errorMsg = error.body.message;
            }
        }
    }) 
}
}