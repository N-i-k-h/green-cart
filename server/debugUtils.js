export const logError = (error, context = '') => {
    const timestamp = new Date().toISOString();
    const errorDetails = {
      timestamp,
      context,
      errorName: error.name,
      errorMessage: error.message,
      stack: error.stack,
      ...(error.response && { response: error.response.data }),
      ...(error.config && { request: {
        url: error.config.url,
        method: error.config.method,
        data: error.config.data
      }})
    };
    
    console.error('DEBUG ERROR:', JSON.stringify(errorDetails, null, 2));
    
    // In production, you might want to send this to an error tracking service
    // like Sentry or Rollbar here
    
    return errorDetails;
  };