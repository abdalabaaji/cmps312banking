const router = require('express').Router()
const bankService = require("./bank-service")

router.route("/accounts/:cid")
    .get(bankService.getAccounts)

router.route("/transfers/:cid")
    .get(bankService.getTransfers)
    .post(bankService.addTransfer)

router.route("/transfers/:cid/:transferId") 
    .delete(bankService.deleteTransfer)

router.route("/beneficiaries/:cid")
    .get(bankService.getBeneficiaries)
    .post(bankService.addBeneficiaries)
    .put(bankService.updateBeneficiaries)

router.route("/beneficiaries/:cid/:accountNo")
    .delete(bankService.deleteBeneficiaries)

router.route("/banks")
    .get(bankService.getBanks)

module.exports = router