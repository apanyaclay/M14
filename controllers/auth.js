const forAdmin = (req, res, next) => {
    let user = req.session.user || "";
    if(user && user.isAdmin){
        next()
    }else{
        res.redirect('/forbidden')
    }
}

export default forAdmin;