const Sauce = require('../models/sauces');
const fs = require('fs');
const schema = require('../middleware/joi/sauces');
const { error } = require('console');
const { invalid } = require('joi');

exports.createSauce = async (req, res, next) => {
    try{
        const sauceObject = JSON.parse(req.body)
        const valid = await schema.validateAsync(sauceObject)
        
        if (valid){
            const sauceObject = JSON.parse(req.body.sauce);
            delete sauceObject._id;
            const sauce = new Sauce({
            ...sauceObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        sauce.save()
        .then(() => res.status(201).json({ message: 'image ajouté !'}))
        .catch( error => res.status(400).json({ error }));        
        } else {
            throw error('invalid')
        }
    } catch (error) {
        res.status(400).json({ error })
    }

}

exports.modifySauce = async(req, res, next) => {
    try{
        const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body};

    const valid = await schema.validateAsync(sauceObject)

    if (valid) {
        Sauce.updateOne({_id: req.params.id},{...sauceObject,_id: req.params.id})
        .then(() => res.status(200).json({message: 'objet modifié !' }))
        .catch( error => res.status(400).json({ error }));
    } else {
        throw error (invalid)
    }
    } catch (error) {
        res.status(400).json({ error })
    }



}

exports.deleteSauce = (req,res,next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`,() => {
            Sauce.deleteOne({_id: req.params.id},{...req.body,id: req.params.id})
            .then(() => res.status(200).json({ message: 'objet supprimé !'}))
            .catch(error => res.status(400).json({ error }))
        })
    })
    .catch(error => res.status(500).json({ error }))
}

exports.findOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

exports.findAllSauce = (req,res, next) => {
    Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
}

exports.likeDislikeSauce = (req, res, next) => {
    const like = req.body.like;
    const userId = req.body.userId;     
    const sauce = req.body.name;
    const id = req.params.id
    
    switch (like){
        case 1:
            Sauce.updateOne({ _id: req.params.id}, {$inc: {likes: 1},$push: {usersLiked: userId} })
            .then(() => res.status(200).json({message:' sauce liké !'}))
            .catch(error => res.status(400).json({ error }))
            break
        case -1: 
            Sauce.updateOne({ _id: req.params.id}, {$inc: {dislikes: 1},$push: {usersDisliked: userId} })
            .then(() => res.status(200).json({message:' sauce disliké !'}))
            .catch(error => res.status(400).json({ error }))
            break
        case 0:
            Sauce.findOne({_id: req.params.id})
            .then((sauce) => {
                if (sauce.usersLiked.includes(userId)){
                    Sauce.updateOne({_id: id}, {$pull: {usersLiked: userId}, $inc:{likes: -1 }})
                    .then(() => res.status(200).json({ message: 'vote annulé !'}))
                    .catch(error => res.status(400).json({ error }))
                }
                if (sauce.usersDisliked.includes(userId)){
                    Sauce.updateOne({_id: id}, {$pull: {usersDisliked: userId}, $inc:{dislikes: -1 }})
                    .then(() => res.status(200).json({ message: 'vote annulé !'}))
                    .catch(error => res.status(400).json({ error }))
                }
            })
            .catch(error => res.status(500).json({ error }))
            break
        
        default: 
            alert(error)
            break
    }

}


