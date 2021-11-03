require("../models/database");
const Landing = require("../models/Landing");
const About = require("../models/About");
const Service = require("../models/Services");
const Contact = require("../models/Contact");
const ApiKey = require("../models/ApiKey");

const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.homepage = async (req, res) => {
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
};

exports.updateService = async (req, res) => {
  let isAuthorized = false;

  ApiKey.find({}, (err, foundItem) => {
    bcrypt.compare(
      req.header("api-key"),
      foundItem[0].apikey,
      (error, result) => {
        if (result) {
          isAuthorized = true;
        } else {
          isAuthorized = false;
        }
      }
    );
  });

  if (isAuthorized) {
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
  } else {
    res.status(403).send("You aren;t authorized to access.");
  }
};

exports.updateLanding = async (req, res) => {
  let isAuthorized = false;

  ApiKey.find({}, (err, foundItem) => {
    bcrypt.compare(
      req.header("api-key"),
      foundItem[0].apikey,
      (error, result) => {
        if (result) {
          isAuthorized = true;
        } else {
          isAuthorized = false;
        }
      }
    );
  });

  if (isAuthorized) {
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
  } else {
    res.status(403).send("You aren;t authorized to access.");
  }
};

exports.updateAboutUs = async (req, res) => {
  let isAuthorized = false;

  ApiKey.find({}, (err, foundItem) => {
    bcrypt.compare(
      req.header("api-key"),
      foundItem[0].apikey,
      (error, result) => {
        if (result) {
          isAuthorized = true;
        } else {
          isAuthorized = false;
        }
      }
    );
  });

  if (isAuthorized) {
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
  } else {
    res.status(403).send("You aren;t authorized to access.");
  }
};

exports.ContactUs = async (req, res) => {
  let isAuthorized = false;

  ApiKey.find({}, (err, foundItem) => {
    bcrypt.compare(
      req.header("api-key"),
      foundItem[0].apikey,
      (error, result) => {
        if (result) {
          isAuthorized = true;
        } else {
          isAuthorized = false;
        }
      }
    );
  });

  if (isAuthorized) {
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
  } else {
    res.status(403).send("You aren;t authorized to access.");
  }
};

exports.getContactUs = async (req, res) => {
  let isAuthorized = false;

  ApiKey.find({}, (err, foundItem) => {
    bcrypt.compare(
      req.header("api-key"),
      foundItem[0].apikey,
      (error, result) => {
        if (result) {
          isAuthorized = true;
        } else {
          isAuthorized = false;
        }
      }
    );
  });

  if (isAuthorized) {
    console.log("Accessing database");
    await Contact.find({}, (err, foundItems) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Inside Database");
        res.send(foundItems);
      }
    });
  } else {
    res.status(403).send("You aren;t authorized to access.");
  }
};

exports.deleteContactUs = async (req, res) => {
  let isAuthorized = false;

  ApiKey.find({}, (err, foundItem) => {
    bcrypt.compare(
      req.header("api-key"),
      foundItem[0].apikey,
      (error, result) => {
        if (result) {
          isAuthorized = true;
        } else {
          isAuthorized = false;
        }
      }
    );
  });

  if (isAuthorized) {
    console.log("Accessing database");
    const deleteContact = await Contact.deleteOne({
      _id: req.params.id,
    });

    res.send(deleteContact);
  } else {
    res.status(403).send("You aren;t authorized to access.");
  }
};
