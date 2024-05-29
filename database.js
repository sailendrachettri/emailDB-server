const {connect} = require('mongoose');

try {
    const connectection = connect(process.env.MONGODB_URL);

    connectection.then(() => {
        console.log("Database connected successfully!");
    
    }).catch(() => {
        console.log("Database CANNOT be connected!");
    })
    
} catch (error) {
    console.log("Database CANNOT be connected!", error.message);
    
}