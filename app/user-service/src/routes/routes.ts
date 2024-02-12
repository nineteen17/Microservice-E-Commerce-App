import express from 'express';
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import Multitenancy from "supertokens-node/recipe/multitenancy";
import { SessionRequest } from 'supertokens-node/framework/express';

const router = express.Router();



router.get("/sessioninfo", verifySession(), async (req: SessionRequest, res) => {
    let session = req.session;
    res.send({
        sessionHandle: session!.getHandle(),
        userId: session!.getUserId(),
        accessTokenPayload: session!.getAccessTokenPayload(),
    });
});

// This API is used by the frontend to create the tenants drop down when the app loads.
// Depending on your UX, you can remove this API.
router.get("/tenants", async (req, res) => {
    let tenants = await Multitenancy.listAllTenants();
    res.send(tenants);
});

export default router; 