import ah from 'express-async-handler'


const authUser = ah(async(req, res) => {
  res.status(200).send({ message: "auth User" });
});


export {
    authUser
}
