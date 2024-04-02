import axios from 'axios'

export class getdataDashBroad{
    constructor(api_url,startDate,endDate){
        this.api_url = api_url
        this.startDate = startDate
        this.endDate = endDate
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
                end: this.endDate
            })

            return data
        } catch (error) {
            return error
        }
    }
}

