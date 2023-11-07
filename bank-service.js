const bankRepo = require('./bank-repository')

class BankService {


    async getBanks(req, res) {
        try {

            const banks = await bankRepo.getBanks();
            res.json(banks);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async getAllAccounts(req, res) {
        try {
            const accounts = await bankRepo.getAllAccounts();
            res.json(accounts);
        } catch (err) {
            res.status(500).send(err);
        }

    }
    async getAccounts(req, res) {
        try {
            const cid = req.params.cid
            const accounts = await bankRepo.getAccounts(cid);
            res.json(accounts);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async getTransfers(req, res) {
        try {
            const cid = req.params.cid
            const transfers = await bankRepo.getTransfers(cid);
            res.json(transfers);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async addTransfer(req, res) {
        try {
            //not used becasue it doesn't make sense for this senario, 
            // just implemented because it was requested the url to be like this
            const cid = req.params.cid
            const transfer = req.body
            if (transfer == null)
                res.status(500).json("transfer can not be null or it should be in json format");
            else {
                const response = await bankRepo.addTransfer(transfer);
                res.json("Successfully added the transfer");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }

    async deleteTransfer(req, res) {
        try {
            const cid = req.params.cid
            const transferId = req.params.transferId
            const response = await bankRepo.deleteTransfer(cid, transferId);
            res.json(response);
        } catch (err) {
            res.status(500).send(err);
        }
    }


    async getBeneficiaries(req, res) {
        try {
            const cid = req.params.cid
            const beneficiaries = await bankRepo.getBeneficiaries(cid);
            res.json(beneficiaries);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async addBeneficiaries(req, res) {
        try {
            //not used becasue it doesn't make sense for this senario, 
            // just implemented because it was requested the url to be like this
            const cid = req.params.cid
            const beneficiary = req.body
            const response = await bankRepo.addBeneficiary(beneficiary);
            res.json(response);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async updateBeneficiaries(req, res) {
        try {
            //not used becasue it doesn't make sense for this senario, 
            // just implemented because it was requested the url to be like this
            const cid = req.params.cid
            const beneficiary = req.body
            const response = await bankRepo.updateBeneficiary(beneficiary);
            res.json(response);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async deleteBeneficiaries(req, res) {
        try {

            const accountNo = req.params.accountNo
            const cid = req.params.cid
            const beneficiaries = await bankRepo.deleteBeneficiary(accountNo, cid);
            res.status(200).json(beneficiaries);
        } catch (err) {
            res.status(500).send(err);
        }
    }

}

module.exports = new BankService()