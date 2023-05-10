const data = {
  states: require("../model/states.json"),
  setStates(data) {
    this.states = data;
  },
};

// https://glitch.com/edit/#!/import/github/DavisFHSU/FinalProject1.git
//https://pie-petalite-velvet.glitch.me/

const State = require("../model/states");

const abb = [ "AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI",
 "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC",
 "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", 
"OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];


const FilterAllStates = async (req, res) => {
  const queryObject = req.query; // This will return an object containing all the key-value pairs in the URL query string
  const conFigValue = queryObject.contig;

  if (!conFigValue) {

    const state1 = await State.find().exec();
    const state2 = data.states;
    const state3 = {...state1, ...state2}
    res.json(state3); 
      // res.json(data.states);    
  }
  
  else if (conFigValue === "false") {

    const state1 = await State.find().exec();
    const state2 = data.states;
    const state3 = {...state1, ...state2};
    const stateArray = Object.values(state3);


    const filteredArray = stateArray.filter(
      (state) => (state.code === "AK" || state.code === "HI")
    ); //  Alaska and Hawaii Only
    
      res.json(filteredArray);
  
  }
    else if (conFigValue === "true") {
    const state1 = await State.find().exec();
    const state2 = data.states;
    const state3 = {...state1, ...state2};
    const stateArray = Object.values(state3);


    const filteredArray = stateArray.filter(
      (state) => (state.code !== "AK" || state.code !== "HI")
    ); //  Not Alaska and Hawaii
    
      res.json(filteredArray);

  };
};


// Get all states
const getAllStates = (req, res) => {
  console.log("getall"); 
  res.json(data.states);
};


// Get a State

const getState = async (req, res) => {

  if (!abb.includes(req.params.id.toUpperCase(),0)) {
    return res.status(404).json({ message: "Invalid State Code. " });
    }
console.log(req.params.id);
  console.log(req.params.id.toUpperCase());

  const stateId = req.params.id; // Get stateId from URL parameter
   
  const state1 = await State.find().exec();
  const state2 = data.states;
  const state3 = {...state1, ...state2};
  const stateArray = Object.values(state3);


  const filteredArray = stateArray.filter(
    (state) => (state.code === req.params.id.toUpperCase())
  ); 
  
    res.json(filteredArray);



  // const state = data.states.filter((emp) => emp.code === stateId);
  // if (!state) {
  //   return res
  //     .status(400)
  //     .json({ message: `State ${stateId} is not found` });
  // }
  // res.json(state);
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

  if (!abb.includes(req.params.id.toUpperCase(),0)) {
  return res.status(404).json({ message: "Invalid State Code. " });
  }

 let state = await State.findOne({ stateCode: req.params.id.toUpperCase() }).exec();

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
  if (!abb.includes(req.params.id.toUpperCase(),0)) {
    return res.status(404).json({ message: "Invalid State Code. " });
    }

  const stateId = req.params.id.toUpperCase(); // Get stateId from URL parameter
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
  if (!abb.includes(req.params.id.toUpperCase(),0)) {
    return res.status(404).json({ message: "Invalid State Code. " });
    }
  const stateId = req.params.id.toUpperCase(); // Get stateId from URL parameter
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
  if (!abb.includes(req.params.id.toUpperCase(),0)) {
    return res.status(404).json({ message: "Invalid State Code. " });
    }
  const stateId = req.params.id.toUpperCase(); // Get stateId from URL parameter
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
  if (!abb.includes(req.params.id.toUpperCase(),0)) {
    return res.status(404).json({ message: "Invalid State Code. " });
    }
  const stateId = req.params.id.toUpperCase(); // Get stateId from URL parameter
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



const postStateFF = async (req, res) => {
 
  if (!abb.includes(req.params.id.toUpperCase(),0)) {
    return res.status(404).json({ message: "Invalid State Code. " });
  }

  if (!req.body.funfact) {
    return res.status(400).json({ message: "funfact parameter is required. " });
  }

  const state = await State.findOne({ stateCode: req.params.id.toUpperCase() }).exec();

  if (!state) {
    return res
      .status(404)
      .json({ message: `No State matches` });
  }
 
  await State.updateOne(
    { stateCode: req.params.id.toUpperCase() },
    { $push: { funfacts: req.body.funfact } }
  );

  res.json({ message: "funfacts updated successfully." });
};



const patchStateFF = async (req, res) => {

  if (!abb.includes(req.params.id.toUpperCase(),0)) {
    return res.status(404).json({ message: "Invalid State Code. " });
  }

  if (!req.body.index || req.body.index <1) {
    return res.status(400).json({ message: "index parameter (not zero based) is required. " });
  }

  if (!req.body.funfact) {
    return res.status(400).json({ message: "funfact parameter is required. " });
  }

  const stateId = req.params.id; // Get stateId from URL parameter
  const index = req.body.index;
  //const funfact = req.body.funfact;

  const state = await State.findOne({ stateCode: req.params.id.toUpperCase() }).exec();
  if (!state) {
    return res
      .status(400)
      .json({ message: `State is not found` });
  }

  if (!state.funfacts.length) {
    return res.status(400).json({ message: "No funfacts exists to replace" });
  }
  
  if (index > state.funfacts.length) {
    return res.status(400).json({ message: "index parameter is too big. " });
  }

  console.log(req.params.id);

  state.funfacts[req.body.index-1] = req.body.funfact;

  await State.deleteOne(
    {stateCode: req.params.id.toUpperCase()}
  );

  const result = await State.create({
    stateCode: req.params.id.toUpperCase(),
    funfacts: state.funfacts,
  });

  res.json({ message: "funfacts updated successfully." });
  
};

const deleteStateFF = async (req, res) => {
  if (!abb.includes(req.params.id.toUpperCase(),0)) {
    return res.status(404).json({ message: "Invalid State Code. " });
  }

  if (!req.body.index || req.body.index <1) {
    return res.status(400).json({ message: "index parameter (not zero based) is required. " });
  }

 

  const state = await State.findOne({ stateCode: req.params.id.toUpperCase() }).exec();
  if (!state) {
    return res
      .status(400)
      .json({ message: `State is not found` });
  }

  if (!state.funfacts.length) {
    return res.status(400).json({ message: "No funfacts exists to delete" });
  }
  
  if (req.body.index  > state.funfacts.length) {
    return res.status(400).json({ message: "index parameter is too big. " });
  }

  await State.updateOne (
    {stateCode: req.params.id.toUpperCase()},
    { $unset: { [`funfacts.${req.body.index-1}`]: "" } }
  );

  await State.updateOne(
    { stateCode: req.params.id.toUpperCase() },
    { $pull: { "funfacts": null } }
  );

  
  res.json({ message: "funfacts deleted successfully." });
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
