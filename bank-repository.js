const fs = require('fs-extra');
const path = require('path');
const banks = require("./data/banks.json")
const accounts = require("./data/accounts.json")
const beneficiaries = require("./data/beneficiaries.json")
const transfers = require("./data/transfers.json")

const { v4: uuidv4 } = require('uuid');

class BankRepository {

    constructor() {
        this.transfersFilePath = "./data/transfers.json"
        this.beneficiariesFilePath = "./data/beneficiaries.json"
    }

    async getBanks() {
        return banks
    }
    async getAccounts(cid) {
        if (cid == null) return "You should pass a customer id"
        else return accounts.filter(c => c.cid == cid);
    }
    async getTransfers(cid) { return transfers.filter(t => t.cid == cid); }

    async addTransfer(transfer) {
        transfer.transferId = uuidv4()
        transfers.push(transfer)
        this.save(this.transfersFilePath, transfers)
        return transfer
    }

    async deleteTransfer(cid, transferId) {
        try {
            const index = transfers.findIndex(_transfer => _transfer.cid == cid
                && _transfer.transferId == transferId);

            console.log(`------CID = ${cid}--${transferId}--- ${index} ------------`);
            if (index >= 0) {
                transfers.splice(index, 1)
                await this.save(this.transfersFilePath, transfers);
                return `transfer successfully deleted`
            }
            return "transfer does not exit"
        } catch (err) {
            console.log(`----------- ${err} ------------`);
            throw err
        }
    }

    async getBeneficiaries(cid) { return beneficiaries.filter(b => b.cid == cid); }

    async addBeneficiary(beneficiary) {
        try {
            beneficiary.id = uuidv4()
            beneficiaries.push(beneficiary)
            this.save(this.beneficiariesFilePath, beneficiaries)
            return beneficiary
        }
        catch (e) {
            return e
        }
    }
    async updateBeneficiary(benefiicary, cid) {
        try {
            const index = beneficiaries.findIndex(_bene => _bene.accountNo == benefiicary.accountNo && _bene.cid == benefiicary.cid);
            if (index >= 0) {
                beneficiaries[index] = benefiicary;
                await this.save(this.beneficiariesFilePath, beneficiaries);
                return `beneficiary ${benefiicary.accounts} successfully updated`
            }
            return `Beneficiary ${benefiicary.accountNo} does not exit`
        } catch (err) {
            throw err
        }
    }
    async deleteBeneficiary(accountNo, cid) {
        try {
            const index = beneficiaries.findIndex(bene => bene.accountNo == accountNo && bene.cid == cid);
            if (index >= 0) {
                beneficiaries.splice(index, 1)
                await this.save(this.beneficiariesFilePath, beneficiaries);
                return `beneficiary with account no ${accountNo} successfully deleted`
            }
            return "Beneficiary does not exit"
        } catch (err) {
            throw err
        }
    }
    async save(filepath, content) {
        return await fs.writeJSON(filepath, content)
    }

}

module.exports = new BankRepository();