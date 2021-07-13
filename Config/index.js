module.exports = {
    sqlDb: {
        host: process.env.SERVER_HOST || 'localhost',
        dbUser : process.env.DB_USER || 'root',
        dbPassword : process.env.DB_PASSWORD || '',
        dbName : process.env.DB_NAME || 'Medical-DB'
    },
    jwtOption: {
        secret: 'sbdkjasdbbbxbx23871236bxhjagsjkbax1723bjhskajSHXBiqhs7231278312bxAHSKJXHGXVQ1782638712TXVKHGSHJAXG',
        expiresIn: '15d'
    },
    serverAuth:{
        secret:'0ccd512f8c3493797a23557c32db38e7d51ed74f14fa7580'
    },
    country : 'en-IN',
    timeZone : 'Asia/Kolkata'
};