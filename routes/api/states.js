const express = require("express");
const router = express();
const stateController = require("../../controllers/stateController");


router.route("/").get(stateController.FilterAllStates);  
router.route("/:id").get(stateController.getState);
router.route("/:id/funfact").get(stateController.getStateFF);
router.route("/:id/capital").get(stateController.getStateCap);
router.route("/:id/nickname").get(stateController.getStateNick);
router.route("/:id/population").get(stateController.getStatePop);
router.route("/:id/admission").get(stateController.getStateAdmis);
router.route("/:id/funfact").post(stateController.postStateFF);
router.route("/:id/funfact").patch(stateController.patchStateFF);
router.route("/:id/funfact").delete(stateController.deleteStateFF);

router.route("/:id").post(stateController.CreateNewState);


module.exports = router;
