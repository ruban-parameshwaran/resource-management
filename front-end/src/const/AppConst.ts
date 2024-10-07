export class AppConst {

    static readonly BaseURL = import.meta.env.VITE_API;
    static readonly ApiURL = import.meta.env.VITE_APP_CONST + 'api';
    static readonly ConnectedURL = import.meta.env.VITE_APP_URL_CONNECTED;

    // product units types
    static readonly product_unit = [
        {label: '400g', value: '400g'},
        {label: '1kg', value: '1kg'}
    ];

    // product status types
    static readonly product_status = [
        {label: 'Active', value:  true},
        {label: 'Inactive', value: false},
    ];

    static readonly payment_method = [
        {label: 'Cash on Delivery', value: 'cod'},
        {label: 'Card Payment', value: 'card'},
        {label: 'Online transfer', value: 'onlinetransfer'}
    ];  

    static readonly payment_status = [
        {label: 'Open', value: 'open'},
        {label: 'Processing', value: 'processing'},
        {label: 'Delivered', value: 'delivered'},
        {label: 'Rejected', value: 'rejected'},
        {label: 'Cancel', value: 'cancel'},
    ];

    static readonly formType = [
        {type: 'CREATE'},
        {type: 'EDIT'}
    ];

}