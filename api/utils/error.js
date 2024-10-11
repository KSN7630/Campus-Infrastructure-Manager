export   const  createError = (status , message) =>{
    const err= new Error()
    err.status =status;
    err.message=message;
    return err;
}

export default createError;









// //Wrong MongoDb id error
// if(err.name==="castError"){
//     const message=`Resource not found. Invalid: ${err.path}`;
//     err=new createError(400,message);
// }
