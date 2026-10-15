import app from './app/app.js'
import connectedToDb from './config/db.js';

await connectedToDb()

app.listen(3000,()=>{
    console.log('Server is running on 3000 port');
    
})