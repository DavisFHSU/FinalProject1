const data = {
  states: require("../model/states.json"),
  setStates(data) {
    this.states = data;
  },
};


const State = require("../model/states");

const abb = [ "AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI",
 "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC",
 "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", 
"OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];


const FilterAllStates = (req, res) => {
  const queryObject = req.query; // This will return an object containing all the key-value pairs in the URL query string
  const conFigValue = queryObject.contig;
  if (!conFigValue) {
      res.json(data.states);    
  }
  
  else if (conFigValue === "false") {
    const filteredArray = data.states.filter(
      (emp) => (emp.code === "AK" || emp.code === "HI")
    ); //  Alaska and Hawaii Only
    
    res.json(filteredArray);
  
  }
    else if (conFigValue === "true") {
      const filteredArray = data.states.filter(
        (emp) => (emp.code !== "AK" && emp.code !== "HI")
      ); //  Alaska and Hawaii Only
      
      res.json(filteredArray);
  };
};


// Get all states
const getAllStates = (req, res) => {
  console.log("getall"); 
  res.json(data.states);
};


// Get a State

const getState = (req, res) => {
  const stateId = req.params.id; // Get stateId from URL parameter
   
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
  console.log("contigTest");
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

const getStateFF = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "stateCode is required. " });
  }

  if (!abb.includes(req.params.id,0)) {
  return res.status(404).json({ message: "Invalid State Code. " });
  }

 let state = await State.findOne({ stateCode: req.params.id }).exec();

 console.log(state);

  if (!state) {
    return res
      .status(404)
      .json({ message: "No stateCode matches. " });
  }

  const length = state.funfacts.length;

  console.log(length);

  const index = Math.floor(Math.random() * length);

  console.log(index);

  const filteredState = {
    name: state.stateCode,
    funfact: state.funfacts[index],
  };

  res.json(filteredState);

 
};


const getStateCap = (req, res) => {
  const stateId = req.params.id; // Get stateId from URL parameter
  const state = data.states.find((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }

  const filteredState = {
    name: state.state,
    capital: state.capital_city,
  };

  res.json(filteredState);
};

const getStateNick = (req, res) => {
  const stateId = req.params.id; // Get stateId from URL parameter
  const state = data.states.find((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }

  const filteredState = {
    name: state.state,
    nickname: state.nickname,
  };

  res.json(filteredState);
};

const getStatePop = (req, res) => {
  const stateId = req.params.id; // Get stateId from URL parameter
  const state = data.states.find((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }

  const filteredState = {
    name: state.state,
    population: state.population,
  };

  res.json(filteredState);
};

const getStateAdmis = (req, res) => {
  const stateId = req.params.id; // Get stateId from URL parameter
  const state = data.states.find((emp) => emp.code === stateId);
  if (!state) {
    return res
      .status(400)
      .json({ message: `State ${stateId} is not found` });
  }

  const filteredState = {
    name: state.state,
    admission: state.admission_date,
  };

  res.json(filteredState);
};

// const postStateFF = await (req, res) => {
//   if (!abb.includes(req.params.id,0)) {
//     return res.status(404).json({ message: "Invalid State Code. " });
//   }

//   if (!req.body.funFacts) {
//     return res.status(400).json({ message: "funFact parameter is required. " });
//   }

//   const state = await State.findOne({ stateCode: req.params.id }).exec();

//   if (!state) {
//     return res
//       .status(404)
//       .json({ message: `No State matches ${req.params.id}` });
//   }
 
//   await State.updateOne(
//     { stateCode: req.params.id },
//     { $push: { funFacts: req.body.funFacts } }
//   );

//   res.json({ message: "Fun facts updated successfully." });
// };


const postStateFF = async (req, res) => {
 
  if (!abb.includes(req.params.id,0)) {
    return res.status(404).json({ message: "Invalid State Code. " });
  }

  if (!req.body.funfact) {
    return res.status(400).json({ message: "funfact parameter is required. " });
  }

  const state = await State.findOne({ stateCode: req.params.id }).exec();

  if (!state) {
    return res
      .status(404)
      .json({ message: `No State matches ${req.params.id}` });
  }
 
  await State.updateOne(
    { stateCode: req.params.id },
    { $push: { funfacts: req.body.funfact } }
  );

  res.json({ message: "funfacts updated successfully." });
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

const CreateNewState = async (req, res) => {
  if (!req.body.stateCode) {
    return res
      .status(400)
      .json({ message: "stateCode is required" });
  }
  try {
    const result = await State.create({
      stateCode: req.body.stateCode,
      //stateName: req.body.stateName,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  FilterAllStates,
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
  CreateNewState,

};
