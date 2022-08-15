const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Location = require("./locationModel");

const References = require("./referencesModel");

const rockSchema = new mongoose.Schema(
  {
    title: {
      type:String,
      unique:true
    },
    editHistory:[
      {
      type: Schema.Types.ObjectId,
      ref:"EditHistory",
      }
    ],
    name: {
      blog: { type: String },
      origin: {
        type: String,
      },
      aliases: [{
        type: String,
      }],
    },
    image: {
      thumbnail: {
        path:{type: {String}}, 
        caption:{type: {String} }
      },
      polished: {
        path:{type: {String}}, 
        caption:{type: {String} } 
      },
      else: [
        {
        path:{type: {String}},
        caption:{type: {String} } 
      } 
      ]},
    description: {
      type: String,
    },
    chemicalProp: { 
      blog: { type: String },
      composition: { element: [String] },
      percent: { type: [Number] },
      formula: { type: String },
      tabularInfo: [{
        key: {type: String},
        value: {type: String},
        factStatus: {type: Boolean},
        group: {type: String},
      }],
    },
    physicalProp: {
      blog: { type: String },
      color: { type: String },
      luminescence: { type: String },
      hardness: { type: Number },
      conductivity: { type: String },
      density: { type: Number },
      meltingPt: { type: Number },
      cleavage_fracture: { type: String },
      tabularInfo: [{
        key: {type: String},
        value: {type: String},
        factStatus: {type: Boolean},
        group: {type: String},
      }],
    },
    OpticalProp: {
      blog: { type: String },
      refractiveeIndex: { type: Number },
      birefergence: { type: Number },
      luster: { type: String },
      tabularInfo: [{
        key: {type: String},
        value: {type: String},
        factStatus: {type: Boolean},
        group: {type: String},
      }],
      },
    mechanicalProp: {
      blog: { type: String },
      shearStrength: { type: String },
      ductility: { type: String },
      tensileStrength: { type: String },
      tabularInfo: [{
        key: {type: String},
        value: {type: String},
        factStatus: {type: Boolean},
        group: {type: String},
      }],
    },
    genetics: {
      blog: { type: String },
      group: { 
        type: String ,
        enum: {
        values: ["sedimentary", "metamorphic", "igneous"],
        message: "Group can only be: sedimentary, metamorphic or igneous",
      }},
      origin: { type: String },
      faecies: { type: String },
    },
    location: {
      blog:{type:String},
      place:[{
      type: Schema.Types.ObjectId,
      ref: "location",
    }],
    tabularInfo: [{
      key: {type: String},
      value: {type: String},
      factStatus: {type: Boolean},
      group: {type: String},
      },
    ]
  },
  progress:
  { type:String,
    default:"in progress",
    enum:["in progress","pending","published"]
  },
    references:[{
      type: Schema.Types.ObjectId,
      ref: "References",
    }],
    video:[{
      type: Schema.Types.ObjectId,
      ref: "References",
    }],
    
     //work in progress  // to store other document's
    isotopes: {
      type: Schema.Types.ObjectId,
      ref: "Isotope",
    },
     //work in progress

    industry: {
    blog: {type:String},
    industry:[
      {
         type: Schema.Types.ObjectId, 
         ref: "Industry" 
      }
    ]
    },
    mineral:{
    blog:{type:String}, 
    mineral:[{
      type: Schema.Types.ObjectId,
      ref: "Mineral",
    }],
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  tags:[{
    type: String
  }]
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


rockSchema.pre(/^find/,function(next){
  this.populate({
    path:'References',
    select:'author'
  });
  next();
})

const Rock = new mongoose.model("rock", rockSchema);


// rockSchema.pre("save", async function (next) {

//   let newlocation = await Location.create(req.body);
//   newlocation.save(function (err, room) {
//     var newRoomId = room._id;
//     console.log(newRoomId);
//   });
  
  // this.populate({
  //   path: "location",
  //   select: "_id",
  // });
  // next();
// });

module.exports = Rock;
