const validateMiddleware = (req, res, next) => {
    const { fullname, email,mobile,city, zipcode } = req.body;
    if (!fullname || !email || !mobile || !city || !zipcode) {
      return res.redirect("/user");
    }
    next();
  };