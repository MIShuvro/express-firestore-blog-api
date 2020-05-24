const formatError = (errors: any) => {
  let errobj = {};
    errors.forEach((key: any) => {
      console.log(key)
      errobj[key.property] = key.constraints 
  });
   return errobj
};

export default formatError;
