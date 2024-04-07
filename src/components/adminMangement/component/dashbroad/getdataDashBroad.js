import axios from 'axios'

export class getdataDashBroad{
    constructor(api_url,startDate,endDate,type){
        this.api_url = api_url
        this.startDate = startDate
        this.endDate = endDate
        this.type = type
    }
    async getTotalOpa(){
        try {
            const data = axios.post(`${this.api_url}businessprofits/getIncome`,{
                start: this.startDate,
                end: this.endDate
            })

            return data
        } catch (error) {
            return error
        }
    }

    async getTotalOpaSelected(){
        try {
            const data = axios.post(`${this.api_url}businessprofits/getIncomeSelected`,{
                start: this.startDate,
                end: this.endDate,
                type: this.type
            })

            return data
        } catch (error) {
            return error
        }
    }

    async getlasttestbill(){
        try {
            const data = axios.post(`${this.api_url}businessprofits/getlasttestbill`,{
                start: this.startDate,
                end: this.endDate
            })

            return data
        } catch (error) {
            return error
        }
    }

    async getProductCount(){
        try {
            
            const data = axios.post(`${this.api_url}businessprofits/getproductcount`,{
                start: this.startDate,
                end: this.endDate,
                type: this.type
            })

            return data
        } catch (error) {
            return error
        }
    }
}

