class baseModel {
    constructor(data,message){

        if(typeof data === 'string'){
            this.message = data;
            data = null;
            message = null;
        }

        if(data){
            this.data = data;
        }
        
        if(message){
            this.message = message;
        }
    }
}

class successModel extends baseModel {
    constructor(data,message){
        super(data,message);
        this.code = 10000;
    }
}

class errorModel extends baseModel {
    constructor(data,message){
        super(data,message)
        this.code == 20000;
    }
}

module.exports = {
    successModel,errorModel
}