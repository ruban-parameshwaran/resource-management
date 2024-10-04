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

}