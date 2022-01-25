import { rtProductCredential } from "./credential.routes";
import { rtProductCoupon } from "./coupon.routes";
import { rtProductShared } from "./product.routes";
import { Router } from "express";

const rt = Router();


rt.use(rtProductShared)
rt.use("/product",rtProductCoupon)
rt.use("/product",rtProductCredential)

export {rt as rtProduct};