"use strict";
exports.__esModule = true;
exports.ServiceItem = void 0;
var ServiceItem = /** @class */ (function () {
    function ServiceItem(id, description, invoiceId, price, vatRate) {
        this.id = id;
        this.description = description;
        this.invoiceId = invoiceId;
        this.price = price;
        this.vatRate = vatRate;
    }
    return ServiceItem;
}());
exports.ServiceItem = ServiceItem;
