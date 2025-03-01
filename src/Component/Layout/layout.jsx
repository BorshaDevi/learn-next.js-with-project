const { default: Header } = require("./Header")

const CommonLayout=({children})=>{
    return (
        <>
        <Header></Header>
        {children}
        </>
    )
}
export default CommonLayout;