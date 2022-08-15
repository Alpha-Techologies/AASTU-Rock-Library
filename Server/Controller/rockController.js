const Rock = require("../models/rockModel");
const Location = require("../models/locationModel");
const Reference = require("../models/referencesModel");
const Mineral = require("../models/mineralModel");
const Industry = require("../models/industry");

const APIError = require("./../utils/apiError");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("./../utils/apiFeatures");

function sendIt(param, res) {
  res.status(200).json({
    status: 200,
    // countstat: stat.length,
    stat: param,
    // data: stat, 
  });
}

exports.getStats = catchAsync(async (req, res) => {
  let rock = await Rock.find();
  // let stat = await Reference.find();

  if (req.params.id == "rocks") {
    let rock = await Rock.find({
      "genetics.group": { $in: ["igneous"] },
    });
    sendIt(rock, res);
  }

  if (req.params.id == "references") {
    let ref = await Reference.find({
      author: { $in: ["hitler1"] },
    });
    sendIt(ref, res);
  }

  if (req.params.id == "minerals") {
    let min = await Mineral.find({
      class: { $in: ["fetched crystal class"] },
    });
    sendIt(min, res);
  }

  if (req.params.id == "industries") {
    let ind = await Industry.find({
      use: { $in: ["use in the industry to be fetched"] },
    });
    sendIt(ind, res);
  }

  if (req.params.id == "locations") {
    let loc = await Location.find({
      name: { $in: ["location name2"] },
    });
    sendIt(loc, res);
  }
});

exports.storeRocks = catchAsync(async (req, res) => {

  let promise = req.body.industry.industry.map(async (el) => {
    let newInd = await Industry.create(el);
    el = newInd._id;
    // console.log(el);
    return el;
  });

  req.body.industry.industry = await Promise.all(promise);
  //////////////////////////////////////////////////////

  let promise2 = req.body.mineral.mineral.map(async (el) => {
    let newMin = await Mineral.create(el);
    el = newMin._id;
    // console.log(el);
    return el;
  });

  req.body.mineral.mineral = await Promise.all(promise2);
  //////////////////////////////////////////////////////
  let promise3 = req.body.reference.map(async (el) => {
    let newRef = await Reference.create(el);
    el = newRef._id;
    // console.log(el);
    return el;
  });

  req.body.references = await Promise.all(promise3);
  //////////////////////////////////////////////////////

  let promise4 = req.body.location.place.map(async (el) => {
    let newloc = await Location.create(el);
    el = newloc._id;
    // console.log(el);
    return el;
  });

req.body.location.place = await Promise.all(promise4);
  //////////////////////////////////////////////////////

  let newRock = await new Rock(req.body);
  newRock.save()
  req.body = newRock._id;

  res.status(200).json({
    status: 200,
    count: newRock.length,
    data: newRock,
  });
});

exports.getRock = catchAsync(async (req, res, next) => {
  console.log("getting rock");

  let query = Rock.find({ name: req.params.id });

  if (req.query.fields == "references") {
    query = Rock.find({ name: req.params.id }).populate({
      path: "references",
      model: Reference,
    });
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  }

  if (req.query.fields == "industries") {
    query = Rock.find({ name: req.params.id }).populate({
      path: "industry",
      model: Industry,
    });
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  }

  if (req.query.fields == "gallery") {
    query = Rock.find({ name: req.params.id }, { images: 1 });
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  }

  if (req.query.fields == "description") {
    query = Rock.find({ name: req.params.id }, { description: 1, images: 1 });
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } 
  //do an if(!rock) then create a new error using the class
  else {
    res.status(404).json({
      status: 400,
      message: "No such page has been found",
    });
    res.end();
  }

  const rock = await query;

  if (!rock) {
    return next(new APIError(`No rock found with id = ${req.params.id}`, 404));
  }
  // properties = req.query;
  res.status(200).json({
    status: 200,
    count: rock.length,
    data: rock,
  });
});

exports.getAllRocks = catchAsync(async (req, res, next) => {
  const query = new APIFeatures(
    Rock.find(), req.query)
    .field()
    .sort()
    .paginate();

  const rock = await query.query;

  if (!rock) {
    return next(new APIError(`No rock found with id = ${req.params.id}`, 404));
  }
  res.status(200).json({
    status: 200,
    count: rock.length,
    data: rock,
  });
});

exports.editRock = catchAsync(async (req, res, next) => {
  const query = Rock.updateOne(
    { name: req.param.id },
    { $set: req.body },
    { new: true, runValidators: true }
  );

  const rock = await query;

  if (!rock) {
    return next(new APIError(`No rock found with id = ${req.params.id}`, 404));
  }
  // console.log(rock);
  res.status(200).json({
    status: 200,
    count: rock.length,
    data: rock,
  });
  res.end();
});

exports.deleteRock = catchAsync(async (req, res, next) => {
  const rock = await Rock.findByIdAndDelete(req.params.id);

  if (!rock) {
    return next(new APIError(`No rock found with id = ${req.params.id}`, 404));
  }
  res.status(204).json({
    status: "sucess",
    count: rock.length,
    data:null,
  });
});
