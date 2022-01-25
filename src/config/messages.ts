import {application} from './config';

//Applications
export const consortium  = {
    initialised: (port:string | number) => `${application.name} API server listening on port => ${port}`,
    welcome: `${application.name} Mainframe API`
};

// MongoDB
export const mongo = {
  error: (error: object | string) => `MongoDB connection error. ${error}`,
  success: (dbURL: string, dbName: string, port: number | string) =>
    `MongoDB connected succesfully. Host: ${dbURL}, Database: ${dbName},Port: ${port}`,
};

export const errors = {
    // Common
    COM001: { message: 'server error occured', code: 'COM001' },
    COM002: { message: 'operation forbidden', code: 'COM002' },
    COM003: { message: 'authentication failure', code: 'COM003' },
    COM004: { message: 'invalid content-type, accepted content types: ', code: 'COM004' },
  
    // JWT
    JWT001: { message: 'jwt verification failed', code: 'JWT001' },
    JWT002: { message: 'jwt not active yet', code: 'JWT002' },
    JWT003: { message: 'jwt token expired', code: 'JWT003' },
    JWT004: { message: 'jwt token missing', code: 'JWT004' },
  
    // Mongo Common Errors
    MON001: { message: 'object id cannot be blank', code: 'MON001' },
    MON002: { message: 'query object is invalid', code: 'MON002' },
    MON003: { message: 'update object is invalid', code: 'MON003' },
    MON004: { message: 'sort object is invalid', code: 'MON004' },
  
    // Dialogflow
    DIAL001: { message: 'dialogflow token fetched successfully', code: 'DIAL001' },
    DIAL002: { message: 'dialogflow token fetching failed', code: 'DIAL002' },
  
    // User
    USER001: { message: 'first name cannot be empty', code: 'USER001' },
    USER002: { message: 'last name cannot be empty', code: 'USER002' },
    USER003: { message: 'email cannot be empty', code: 'USER003' },
    USER004: { message: 'company name cannot be empty', code: 'USER004' },
    USER005: { message: 'email can not be outside vapp domain', code: 'USER005' },
    USER006: { message: 'password cannot be empty', code: 'USER006' },
    USER007: { message: 'agent created successfully', code: 'USER007' },
    USER008: { message: 'no users exist in database', code: 'USER008' },
    USER009: { message: 'user doesn\'t exist in database', code: 'USER009' },
    USER010: { message: 'user deleted successfully', code: 'USER010' },
    USER011: { message: 'user updated successfully', code: 'USER011' },
    USER012: { message: 'user already updated', code: 'USER012' },
    USER013: { message: 'client created successfully', code: 'USER013' },
    USER014: { message: 'admin created successfully', code: 'USER014' },
    USER015: { message: 'password changed successfully', code: 'USER015' },
    USER016: { message: 'password incorrect', code: 'USER016' },
    USER017: { message: 'user authenticated successfully', code: 'USER017' },
    USER018: { message: 'old and new passwords cannot be same', code: 'USER018' },
    USER019: { message: 'old password cannot be empty', code: 'USER019' },
    USER020: { message: 'new password cannot be empty', code: 'USER020' },
    USER021: { message: 'old password incorrect', code: 'USER021' },
    USER022: { message: 'user already exists', code: 'USER022' },
    USER023: { message: 'sms cost cannot be empty', code: 'USER023' },
    USER024: { message: 'sms cost can only be numbers', code: 'USER024' },
    USER025: { message: 'user profile fetched successfully', code: 'USER025' },
    USER026: { message: 'user image file missing', code: 'USER026' },
    USER027: { message: 'invalid image format', code: 'USER027' },
    USER028: { message: 'user profile updated successfully', code: 'USER028' },
    USER029: { message: 'sms sender id cannot be empty', code: 'USER029' },
    USER030: { message: 'sms sender id must be 6 characters', code: 'USER030' },
    USER031: { message: 'sms sender id must contain only alphabets', code: 'USER031' },
    USER032: { message: 'user fetched successfully', code: 'USER032' },
    USER033: { message: 'users fetched successfully', code: 'USER033' },
    USER034: { message: 'users access changed successfully', code: 'USER034' },
    USER035: { message: 'user not activated', code: 'USER035' },
  }