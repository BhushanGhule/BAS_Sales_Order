sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("com.sap.soapp.controller.Home", {
            onInit: function () {
                this._oTable = this.byId("table0");
            },
            onOpenAddDialog: function () {
                this.getView().byId("OpenDialog").open();
            },
            onCancelDialog: function (oEvent) {
                oEvent.getSource().getParent().close();
            },
            onCreate: function (oEvent) {
                var oSo = this.getView().byId("idSo").getValue();
                if (oSo !== "") {
                    const oList = this._oTable;
                    const oBinding = oList.getBinding("items");
                    const oContext = oBinding.create({
                        "soNumber": this.byId("idSo").getValue(),
                        "customerName": this.byId("idCustName").getValue(),
                        "customerNumber": this.byId("idCustomer").getValue(),
                        "PoNumber": this.byId("idPo").getValue(),
                        "inquiryNumber": this.byId("idInqNumber").getValue()
                    });
                    oContext.created()
                        .then(() => {
                            // that._focusItem(oList, oContext);
                            this.getView().byId("OpenDialog").close();
                        });

                } else {
                    MessageToast.show("So cannot be blank");
                 }
                 this.refreshTable();
                 oEvent.getSource().getParent().close();
            },
            onEditMode: function () {
                this.byId("editModeButton").setVisible(false);
                this.byId("saveButton").setVisible(true);
                this.byId("deleteButton").setVisible(true);
                this.rebindTable(this.oEditableTemplate, "Edit");
                this.refreshTable();
            },
            onDelete: function(){

                var oSelected = this.byId("table0").getSelectedItem();
                if(oSelected){
                    var oSalesOrder = oSelected.getBindingContext("mainModel").getObject().soNumber;
                
                    oSelected.getBindingContext("mainModel").delete("$auto").then(function () {
                        MessageToast.show(oSalesOrder + " SuccessFully Deleted");
                    }.bind(this), function (oError) {
                        MessageToast.show("Deletion Error: ",oError);
                    });
                } else {
                    MessageToast.show("Please Select a Row to Delete");
                }
                this.refreshTable();
            },
            refreshTable : function (params) {
             //   sap.ui.getCore().byId("table0").getModel("mainModel").refresh(true) 
             var oBinding = this.byId("table0").getBinding("items");

             if (oBinding.hasPendingChanges()) {
                 MessageBox.error(this._getText("refreshNotPossibleMessage"));
                 return;
             }
             oBinding.refresh();

            },
            _getText : function (sTextId, aArgs) {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sTextId, aArgs);
            }

        });
    });
