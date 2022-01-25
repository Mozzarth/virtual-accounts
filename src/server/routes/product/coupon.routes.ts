import { productCouponCreateController as ctrlCreate } from '../../controllers/product/create/coupon-create.controller';
import { productCouponFindController as ctrlFind  } from '../../controllers/product/find/product-coupon.controller';
import { Router } from "express";

const rt = Router();

rt.post("/coupon", ctrlCreate.handle.bind(ctrlCreate))
rt.get("/coupons/me", ctrlFind.findMe.bind(ctrlFind))
rt.get("/coupons/metopuser", ctrlFind.findByTopUser.bind(ctrlFind))

export { rt as rtProductCoupon }