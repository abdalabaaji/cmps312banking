const fs = require('@cyclic.sh/s3fs');
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
    async getAllAccounts() {
        return accounts
    }
    async getAccounts(cid) {
        if (cid == null) return "You should pass a customer id"
        else return accounts.filter(c => c.cid == cid);
    }
    async getTransfers(cid) { return transfers.filter(t => t.cid == cid); }

    async addTransfer(transfer) {
        transfer.transferId = uuid()
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
    async updateBeneficiary(beneficiary, cid) {
        try {
            const index = beneficiaries.findIndex(_bene => _bene.accountNo == beneficiary.accountNo && _bene.cid == beneficiary.cid);
            if (index >= 0) {
                beneficiaries[index] = beneficiary;
                await this.save(this.beneficiariesFilePath, beneficiaries);
                return `beneficiary ${beneficiary.accounts} successfully updated`
            }
            return `Beneficiary ${beneficiary.accountNo} does not exit`
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