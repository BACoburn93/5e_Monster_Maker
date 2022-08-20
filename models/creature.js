const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreatureSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    sharable: Boolean,
    name: String,
    creatureType: String,
    subType1: String,
    subType2: String,
    alignment: String,
    swarm: String,
    swarmType: String,
    size: String,
    unique: String,
    cr: Number,
    proficiency: {
        type: Number
    },
    specialTrait: String,
    action: String,
    bonusAction: String,
    reaction: String,
    legendaryAction: String,
    mythicAction: String,
    lairAction: String,
    divineAction: String,
    characteristic: String,
    ac: String,
    armorType: String,
    passivePerception: String,
    hpDieAmount: Number,
    hpDieValue: String,
    hpModifier: Number,
    averageHitpoints: Number,
    str: Number,
    strMod: Number,
    dex: Number,
    dexMod: Number,
    con: Number,
    conMod: Number,
    int: Number,
    intMod: Number,
    wis: Number,
    wisMod: Number,
    cha: Number,
    chaMod: Number,
    savingThrowProf: [
        String
    ],
    damageAdjustment: String,
    conditionImmunity: [
        String
    ],
    environment: [
        String
    ],
    language: String,
    sense: String,
    skill: [
        String
    ],
    movement: String
});

module.exports = mongoose.model('Creature', CreatureSchema);