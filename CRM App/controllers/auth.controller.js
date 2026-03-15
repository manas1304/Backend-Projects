const bcrypt = require('bcryptjs')
const user = require('../models/users.models')
const constants = require('../utils/constants')
const jwt = require('jsonwebtoken')
const config = require('../configs/auth.config');
const Workspace = require('../models/workspace.model'); // Imported Workspace model ---
const {sendWelcomeEmail} = require('../utils/email.util');

/*
    Used for Signup logic
*/
exports.signup = async (req, res) =>{

    let userStatus = req.body.userStatus;
    if(!req.body.userType || req.body.userType == constants.userTypes.customer){
        userStatus = constants.userStatus.approved
    }else{
        userStatus = constants.userStatus.pending
    }

    try{
        // Workspace Generation & Validation Logic
        // 1. Capture workspace id if provided ( for invited users)
        let assignedWorkspaceId = req.body.workspaceId;
        let newWorkspace = null;

        // 2. If it's an Admin and no workspace is provided, create a new Workspace for them
        if (req.body.userType === constants.userTypes.admin && !assignedWorkspaceId) {
            newWorkspace = await Workspace.create({
                name: `${req.body.name}'s Company`,
                ownerId: null // Temporarily null, will link after the user document is created
            });
            assignedWorkspaceId = newWorkspace._id;
        }

        // 3. Reject any signup that doesn't belong to a workspace
        if (!assignedWorkspaceId) {
            return res.status(400).send({ message: "Failed! A workspaceId is required to join." });
        }

        const userObj = {
            name: req.body.name,
            userId: req.body.userId,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            userType: req.body.userType,
            userStatus: userStatus,
            workspaceId: assignedWorkspaceId // Link the new user to the workspace
        }

        const userCreated = await user.create(userObj);

        // Link Admin to Workspace ---
        // 4. If we created a new workspace, update its ownerId to this newly created Admin
        if (newWorkspace) {
            newWorkspace.ownerId = userCreated._id;
            await newWorkspace.save();
        }

        // Triggering welcome email feature as soon as the user Object is created
        sendWelcomeEmail(userCreated.email, userCreated.name);

        const postRes = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            userStatus: userCreated.userStatus,
            workspaceId: userCreated.workspaceId, // Return workspaceId in the response
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt
        }
        res.status(201).send(postRes)
        console.log(postRes); 

    }catch(err){
        console.log("Error while creating user", err);
        res.status(500).send({
            message: "Some internal error occured while creating the user"
        })
    }
}


/*
    Used for Signin Logic
*/
exports.signin = async(req, res) =>{
    
    // Check if the userId is present or not.
    const user1 = await user.findOne({userId: req.body.userId});
    if(user1 == null){
        res.status(400).send({
            message:`Bad Request! ${req.body.userId} is not correct.`
        })
        return;
    }

    // Check if the userStatus is approved or not.
    if(user1.userStatus != constants.userStatus.approved){
        res.status(400).send({
            message:`Can't allow the login as the userStatus is not approved. Current Status: ${user.userStatus}`
        })
        return; // Added missing return to stop execution if not approved
    }

    // Check if the password is correct or not
    const passwordIsValid = bcrypt.compareSync(req.body.password, user1.password);
    if(!passwordIsValid){
        res.status(401).send({
            message:"You entered incorrect password. Please check the password and try again"
        })
        return;
    }

    // Generate the JWT token and return it.
    // Inject workspaceId into the JWT payload ---
    // Now, every time the user makes an API request, we know which company data they are allowed to see
    const token = jwt.sign(
        { id: user1.userId, workspaceId: user1.workspaceId }, 
        config.secret, 
        { expiresIn: 300 }
    )

    // Return the final response
    res.status(200).send({
        name: user1.name,
        userId: user1.userId,
        userType: user1.userType,
        email: user1.email,
        userStatus: user1.userStatus,
        workspaceId: user1.workspaceId, // Send workspaceId back to the frontend ---
        accessToken: token
    })
    
}