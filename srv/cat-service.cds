using { SalesOrder.db as SalesOrder } from '../db/data-model';

@path: 'sap/opu/odata/sap/salesorder'
service CatalogService
    {

    entity SalesOrderSet as projection on SalesOrder.SalesOrders
    }