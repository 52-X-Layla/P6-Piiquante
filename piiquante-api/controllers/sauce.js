const Sauce = require('../models/sauce');
const fs = require('fs');

// CREATE A NEW SAUCE

exports.createSauce = (req, res, next) => {

  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;

  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    .catch(error => res.status(400).json({ error }));
};

// GET ALL SAUCES

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

// GET ONE SAUCE BY ID

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

// UPDATE A SAUCE

exports.updateSauce = (req, res, next) => {

  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }
    : { ...req.body };

  delete sauceObject._userId;

  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      if (sauce.userId !== req.auth.userId) {
        return res.status(403).json({ message: 'Non autorisé !' });
      }

      Sauce.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
      )
      .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
      .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

// DELETE A SAUCE

exports.deleteSauce = (req, res, next) => {

  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {

      if (!sauce) {
        return res.status(404).json({ error: 'Sauce not found' });
      }

      if (sauce.userId !== req.auth.userId) {
        return res.status(403).json({ message: 'Non autorisé !' });
      }

      const filename = sauce.imageUrl.split('/images/')[1];

      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

// LIKE / DISLIKE A SAUCE

exports.likeSauce = (req, res, next) => {

  const userId = req.auth.userId;
  const like = req.body.like;

  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {

      if (like === 1) {
        if (!sauce.usersLiked.includes(userId)) {
          sauce.usersLiked.push(userId);
          sauce.likes++;
        }
      }
      else if (like === -1) {
        if (!sauce.usersDisliked.includes(userId)) {
          sauce.usersDisliked.push(userId);
          sauce.dislikes++;
        }
      }
      else if (like === 0) {
        // Remove like
        if (sauce.usersLiked.includes(userId)) {
          sauce.usersLiked = sauce.usersLiked.filter(id => id !== userId);
          sauce.likes--;
        }
        // Remove dislike
        if (sauce.usersDisliked.includes(userId)) {
          sauce.usersDisliked = sauce.usersDisliked.filter(id => id !== userId);
          sauce.dislikes--;
        }
      }

      sauce.save()
        .then(() => res.status(200).json({ message: 'Préférence mise à jour !' }))
        .catch(error => res.status(400).json({ error }));

    })
    .catch(error => res.status(404).json({ error }));
};
