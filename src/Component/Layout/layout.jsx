const { default: Header } = require("./Header")

const CommonLayout=({children})=>{
    const isAuth=false;
    return (
        <div className="min-h-screen">
        
            {isAuth && <Header></Header> }
        {children}
        </div>
    )
}
export default CommonLayout;