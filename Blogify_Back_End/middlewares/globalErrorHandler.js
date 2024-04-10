const globalErrorhandler = (err, req, res, next) => {
    // status
    const status = err?.status ? err?.status : "failed"
   // message 
   const message = err?.message;
    // stack
    const stack = err?.stack;

    res.status(500).json({
        status,
        message,
        stack,
      })
  
}

// not found hander

const  notFound = (req,res,next)=>{
    const err = new Error(`cannot find ${req.originalUrl} on this server`);
    next(err);
    
}

module.exports = {notFound,globalErrorhandler};