import { productCredentialCreateController as ctrlCreate } from '../../controllers/product/create/credential-create.controller';
import { productFindCredentialController as ctrlFind } from '../../controllers/product/find/product-credential.controller';
import { Router } from "express";


const rt = Router();

rt.post("/credential", ctrlCreate.handle.bind(ctrlCreate))
rt.get("/credentials/me", ctrlFind.findMe.bind(ctrlFind))
rt.get("/credentials/metopuser", ctrlFind.findByTopUser.bind(ctrlFind))

export {rt as rtProductCredential}