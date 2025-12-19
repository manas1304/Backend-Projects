exports.validatePOSTReqBody = (req, res, next) => {
    
    const reqObj = req.body;
    
    // Validate if the id in param and id in body matches
    if(reqObj["id"] !== req.params.id){

        return res.status(400).send({

            message:`Bad request, "id" field in body doesn't match with id in params`
        })
    }
    
    // Valide if the ideaName field is present

    if(!reqObj["ideaName"]){

        return res.status(400).send({
            message: `Bad request body, "ideaName" field is not present`
        })

    }

    // Valide if the authorName field is present

    if(!reqObj["authorName"]){

        return res.status(400).send({
            message: `Bad request body, "authorName" field is not present`
        })

    }

    // Valide if the ideaDescription field is present

    if(!reqObj["ideaDescription"]){

        return res.status(400).send({
            message: `Bad request body, "ideaDescription" field is not present`
        })

    }

    next();

}

exports.validatePUTReqBody = (req, res, next) => {
    
    const reqObj = req.body;

    
    // Validate if the id field is present
    if(!reqObj["id"]){

        return res.status(400).send({
            message:`Bad request body, "id" field is not present`
        })

    }
    
    // Validate if the id in param and id in body matches
    if(reqObj["id"] != req.params.id){

        return res.status(400).send({

            message:`Bad request, "id" field in body doesn't match with id in params`
        })
    }
    
    // Validate if the ideaName field is present

    if(!reqObj["ideaName"]){

        return res.status(400).send({
            message: `Bad request body, "ideaName" field is not present`
        })

    }

    // Validate if the authorName field is present

    if(!reqObj["authorName"]){

        return res.status(400).send({
            message: `Bad request body, "authorName" field is not present`
        })

    }

    // Validate if the ideaDescription field is present

    if(!reqObj["ideaDescription"]){

        return res.status(400).send({
            message: `Bad request body, "ideaDescription" field is not present`
        })

    }

    next();
    
}