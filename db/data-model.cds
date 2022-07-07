namespace SalesOrder.db;

entity SalesOrders {
    key soNumber   : String(10)
            @mandatory
            @title : 'Sales Order Number';
        orderDate       : Date
            @title : 'Order Date';
        customerName    : String(50)
            @title : 'Customer Name';
        customerNumber  : String(10)
            @title : 'Customer Number';
        PoNumber        : String
            @title : 'PO Number';
        inquiryNumber   : String(10)
            @title : 'Inquiry Number';
        totalOrderItems : Integer
            @title : 'Total Sales Order';
}
