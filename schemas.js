const Joi = require('joi')

module.exports.creatureSchema = Joi.object({
    creature: Joi.object({
        name: Joi.string().required(),
        creatureType: Joi.string().required(),
        subType1: Joi.string().required(),
        subType2: Joi.string().required(),
        alignment: Joi.string().required(),
        swarm: Joi.string().required(),
        swarmType: Joi.string().required(),
        size: Joi.string().required(),
        unique: Joi.string().required(),
        proficiency: Joi.number().required(),
        cr: Joi.number().required(),
        specialTrait: Joi.string().required(),
        action: Joi.string().required(),
        bonusAction: Joi.string().required(),
        reaction: Joi.string().required(),
        legendaryAction: Joi.string().required(),
        mythicAction: Joi.string().required(),
        lairAction: Joi.string().required(),
        divineAction: Joi.string().required(),
        characteristic: Joi.string().required(),
        ac: Joi.number().required(),
        armorType: Joi.string().required(),
        passivePerception: Joi.number().required(),
        hpDieAmount: Joi.number().required(),
        hpDieValue: Joi.string().required(),
        hpModifier: Joi.number().required(),
        averageHitpoints: Joi.number().required(),
        str: Joi.number().required(),
        dex: Joi.number().required(),
        con: Joi.number().required(),
        int: Joi.number().required(),
        wis: Joi.number().required(),
        cha: Joi.number().required(),
        savingThrowProf: Joi.string().required(),
        damageAdjustment: Joi.string().required(),
        conditionImmunity: Joi.string().required(),
        environment: Joi.string().required(),
        language: Joi.string().required(),
        sense: Joi.string().required(),
        skill: Joi.string().required(),
        movement: Joi.string().required(),
    }).required()
});

// module.exports.reviewSchema = Joi.object({
//     review: Joi.object({
//         rating: Joi.number().required().min(1).max(5),
//         body: Joi.string().required()
//     }).required()
// })