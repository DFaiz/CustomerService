const customerEmailInvalid = {success: false,msg: 'Email is invalid'};
const customerIdFormat = {success: false,msg: 'Customer ID format is invalid'};
const customerNameInvalid = {success: false,msg:'Customer name must contain value'};
const customerAddrssInvalid = {success: false,msg:'Customer address must contain value'};
const customerNoToken = {success: false,msg:'Customer must have at least one token'};
const customerAlrdyExists = {success: false,msg:'User with requested ID already exists'};
const customerNotDeleted = {success: false,msg:'Customer could not be deleted'};
const customerNotUpdatedNoId = {success: false,msg:'Customer could not be updated - no customer ID was provided'};
const customerNotUpdatedId = {success: false,msg:'Customer could not be updated - customer ID format invalid'};
const customerNotUpdatedEmail = {success: false,msg:'Customer could not be updated - Email is invalid'};
const customerNotUpdatedNoTkn = {success: false,msg:'Customer could not be updated - Customer must have at least one token'};
const customerNotUpdated = {success: false,msg:'Customer could not be updated'};
const customerUpdated = {success: true,msg:'Customer was updated successfully'};
const customerNotFound = {success: false,msg:'Customer could not be found'};

const error405Msg = {success: false,
					msg: 'Method not supported'};
 
const error404Msg = {success: false,
					msg: 'Invalid URL'};
					
const error500Msg = {success: false,
					msg: "The server encountered an unexpected condition which prevented it from fulfilling the request"};

exports.customerEmailInvalid = customerEmailInvalid;
exports.customerIdFormat = customerIdFormat;
exports.customerNameInvalid = customerNameInvalid;
exports.customerAddrssInvalid = customerAddrssInvalid;
exports.customerNoToken = customerNoToken;
exports.customerAlrdyExists = customerAlrdyExists;
exports.customerNotDeleted  = customerNotDeleted;
exports.customerNotUpdatedNoId  = customerNotUpdatedNoId;
exports.customerNotUpdatedId = customerNotUpdatedId;
exports.customerNotUpdatedEmail = customerNotUpdatedEmail;
exports.customerNotUpdatedNoTkn = customerNotUpdatedNoTkn;
exports.customerNotUpdated = customerNotUpdated;
exports.customerUpdated = customerUpdated;
exports.customerNotFound = customerNotFound;

exports.error404Msg = error404Msg;
exports.error500Msg = error500Msg;
exports.error405Msg = error405Msg;