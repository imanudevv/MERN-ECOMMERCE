class APIFunctionality {
    constructor(query,querystr){
        this.query=query,
        this.querystr=querystr
    }
    search(){
         const keyword = this.querystr.keyword?{
            name:{
                $regex:this.querystr.keyword,
                $option:"1"
            }
         }:{};
         console.log(keyword);
         
         this.query=this.query.find({...keyword})
         return this
    }
}

export default APIFunctionality;