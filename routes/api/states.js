const express = require("express");
const router = express();
const stateController = require("../../controllers/stateController");

router.route("/").get(stateController.getAllStates)
router.route("/?contig=true").get(stateController.getContigStates);

//router.route(/.*true$/).get(stateController.getContigStates);

router.route("/?contig=false").get(stateController.getNonContigStates);
router.route("/:id").get(stateController.getState);
router.route("/:id/funfacts").get(stateController.getStateFF);
router.route("/:id/capital").get(stateController.getStateCap);
router.route("/:id/nickname").get(stateController.getStateNick);
router.route("/:id/population").get(stateController.getStatePop);
router.route("/:id/admission").get(stateController.getStateAdmis);

router.route("/:id/funfacts").post(stateController.postStateFF);
router.route("/:id/funfacts").patch(stateController.patchStateFF);
router.route("/:id/funfacts").delete(stateController.deleteStateFF);


module.exports = router;
