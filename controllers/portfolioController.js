require("../models/database");
const Landing = require("../models/Landing");
const About = require("../models/About");
const Service = require("../models/Services");
const Contact = require("../models/Contact");

exports.homepage = async (req, res) => {
  // try {
  console.log("Accessing database");
  const landingData = await Landing.find({});
  const aboutData = await About.find({});

  await Service.find({}, (err, foundItems) => {
    if (err) {
      console.log("Error in Accessing database");
      console.log(err);
    } else {
      console.log("Insode Database");
      console.log(foundItems);
      res.status(200).json([
        {
          landing: landingData,
          about: aboutData,
          services: foundItems,
        },
      ]);
    }
  });

  //   console.log("Accessing database last")
  // } catch (err) {
  //   console.log("Error Occured ok")
  //   res.status(500).send({ message: error.message || "Error Occured" })
  // }
};

exports.updateService = async (req, res) => {
  const update = await Service.replaceOne(
    {
      _id: req.params.id,
    },
    {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
    }
  );

  res.send(update);
};

exports.updateLanding = async (req, res) => {
  // res.send(req.body)

  const updateLandings = await Landing.replaceOne(
    {
      _id: req.params.id,
    },
    {
      title: req.body.title,
      image: req.body.image,
      name: req.body.name,
    }
  );

  res.send(updateLandings);
};

exports.updateAboutUs = async (req, res) => {
  const updateAbout = await About.replaceOne(
    {
      _id: req.params.id,
    },
    {
      title: req.body.title,
      link: req.body.link,
      description: req.body.description,
    }
  );

  res.send(updateAbout);
};

exports.ContactUs = async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    message: req.body.message,
  });

  contact.save((err) => {
    if (err) {
      res.status(200).send("Messaged saved successfully.");
    } else {
      res.status(err.status).send(err.message);
    }
  });
};

exports.getContactUs = async (req, res) => {
  console.log("Accessing database");
  await Contact.find({}, (err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Inside Database");
      res.send(foundItems);
    }
  });
};

exports.deleteContactUs = async (req, res) => {
  console.log("Accessing database");
  const deleteContact = await Contact.deleteOne({ _id: req.params.id });

  res.send(deleteContact);
};
