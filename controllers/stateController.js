const data = {
  states: require("../model/states.json"),
  setStates(data) {
    this.states = data;
  },
};

// Get all states
const getAllStates = (req, res) => {
  res.json(data.states);
};


// Get a State

const getState = (req, res) => {
  const stateId = req.params.id; // Get stateId from URL parameter
  console.log(stateId);
  const state = data.states.filter((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }
  res.json(state);
};

//get contiguous states

const getContigStates = (req, res) => {
    const filteredArray = data.states.filter((emp) => emp.code !== "UT"); // Exclude Alaska and Hawaii 
console.log("test");
  res.json(filteredArray);
};

//get noncontiguous states

const getNonContigStates = (req, res) => {
  const filteredArray = data.states.filter(
  (emp) => (emp.code === "AK" || emp.code === "HI")
); // Exclude Alaska and Hawaii 

res.json(filteredArray);
};

//get random funfact-mongo

const getStateFF  = (req, res) => {
  const stateId = req.params.id; // Get stateId from URL parameter
  
  
  ///res.json(XXX);
};


const getStateCap = (req, res) => {
  const stateId = req.params.id; // Get stateId from URL parameter
  const state = data.states.find((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }

  // const result = state.

  // res.json(result);
};

const getStateNick = (req, res) => {
  const stateId = req.params.id; // Get stateId from URL parameter
  const state = data.states.find((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }

  // const result = state.

  // res.json(result);
};

const getStatePop = (req, res) => {
  const stateId = req.params.id; // Get stateId from URL parameter
  const state = data.states.find((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }

  // const result = state.

  // res.json(result);
};

const getStateAdmis = (req, res) => {
  const stateId = req.params.id; // Get stateId from URL parameter
  const state = data.states.find((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }

  // const result = state.

  // res.json(result);
};

const postStateFF = (req, res) => {
  const stateId = req.params.id; // Get stateId from URL parameter
  const state = data.states.find((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }

  // const result = state.

  // res.json(result);
};

const patchStateFF = (req, res) => {
  const stateId = req.params.id; // Get stateId from URL parameter
  const state = data.states.find((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }

  // const result = state.

  // res.json(result);
};

const deleteStateFF = (req, res) => {
  const stateId = req.params.id; // Get stateId from URL parameter
  const state = data.states.find((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }

  // const result = state.

  // res.json(result);
};



module.exports = {
  getAllStates,
  getContigStates,
  getNonContigStates,
  getState,
  getStateFF,
  getStateCap,
  getStateNick,
  getStatePop,
  getStateAdmis,
  postStateFF,
  patchStateFF,
  deleteStateFF,

};
