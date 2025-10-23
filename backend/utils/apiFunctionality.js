class APIFunctionality {
    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr;
    }

    search() {
        const keyword = this.querystr.keyword ? {
            name: {
                $regex: this.querystr.keyword,
                $options: "i"
            }
        } : {};

   
        this.query = this.query.find({ ...keyword });
        return this;
    }
}

export default APIFunctionality;
