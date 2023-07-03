import { Router } from "express";

const testRouter = Router();

testRouter.get("/", (req, res) => {
    res.send("<h1>Hello</h1>");
});
testRouter.get("/:naam", (req, res) => {
    res.send("<h1>"+ req.params.naam +"</h1>");
});


export default testRouter ;


